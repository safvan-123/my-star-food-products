import {useEffect, useMemo, useState} from 'react';
import {useClient} from 'sanity';
import {useRouter} from 'sanity/router';
import {Badge, Box, Button, Card, Flex, Heading, Inline, Select, Spinner, Stack, Text, TextInput} from '@sanity/ui';
import {Image as ImageIcon, PackageOpen, Pencil, Plus, Search, Tag} from 'lucide-react';

type ProductRow = {
  _id: string; name?: string; category?: string; categoryId?: string; visible?: boolean; featured?: boolean;
  imageUrl?: string; slug?: string; isDraft?: boolean;
};
type CategoryRow = {_id: string; name?: string; slug?: string; isDraft?: boolean};
type Props = {options?: {type?: string}};

const query = `*[_type == $type && !(_id in path("versions.**"))]{_id,name,"slug":slug.current,visible,featured,"category":category->name,"categoryId":category._ref,"imageUrl":mainImage.asset->url}`;

export function DocumentTable({options}: Props) {
  const type = options?.type === 'productCategory' ? 'productCategory' : 'product';
  const baseClient = useClient({apiVersion: '2026-10-01'});
  const client = useMemo(() => baseClient.withConfig({perspective: 'raw'}), [baseClient]);
  const router = useRouter();
  const [documents, setDocuments] = useState<Array<ProductRow | CategoryRow>>([]);
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const [rows, categoryRows] = await Promise.all([
          client.fetch<Array<ProductRow | CategoryRow>>(query, {type}),
          type === 'product' ? client.fetch<CategoryRow[]>(
            '*[_type == "productCategory" && !(_id in path("drafts.**"))]{_id,name,"slug":slug.current} | order(name asc)',
          ) : Promise.resolve([] as CategoryRow[]),
        ]);
        if (cancelled) return;
        setDocuments(rows);
        setCategories(categoryRows);
      } catch {
        if (!cancelled) setDocuments([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {cancelled = true;};
  }, [client, type]);

  const rows = useMemo(() => {
    const grouped = new Map<string, ProductRow | CategoryRow>();
    for (const document of documents) {
      const draft = document._id.startsWith('drafts.');
      const id = draft ? document._id.slice('drafts.'.length) : document._id;
      const previous = grouped.get(id);
      grouped.set(id, draft ? {...document, _id: id, isDraft: true} : {...document, isDraft: previous?.isDraft || false});
    }
    return [...grouped.values()].sort((left, right) => (left.name || '').localeCompare(right.name || ''));
  }, [documents]);

  const filtered = rows.filter(row => {
    const matchesSearch = (row.name || '').toLocaleLowerCase().includes(search.trim().toLocaleLowerCase());
    const matchesCategory = type !== 'product' || !category || (row as ProductRow).categoryId === category;
    return matchesSearch && matchesCategory;
  });

  const open = (id: string) => router.navigateIntent('edit', {id, type});
  const create = () => router.navigateIntent('create', {type});
  const title = type === 'product' ? 'Products' : 'Product Categories';
  const ListIcon = type === 'product' ? PackageOpen : Tag;
  const hasFilters = Boolean(search || category);

  return <Box className="studio-catalogue-list">
    <Card className="studio-catalogue-heading" radius={4} border padding={[3, 4]}>
      <Flex align="center" justify="space-between" gap={3} wrap="wrap">
        <Flex align="center" gap={3}>
          <span className="studio-catalogue-icon"><ListIcon size={22} aria-hidden="true"/></span>
          <Heading as="h2" size={3}>{title}</Heading>
        </Flex>
        <Button icon={Plus} text={type === 'product' ? 'Add Product' : 'Add Category'} tone="primary" onClick={create}/>
      </Flex>
    </Card>
    <Card className="studio-catalogue-results" border radius={4}>
      <div className="studio-catalogue-toolbar">
        <Box className="studio-catalogue-search">
          <TextInput icon={Search} aria-label={'Search ' + title.toLowerCase()} placeholder={'Search ' + title.toLowerCase()} value={search} onChange={event => setSearch(event.currentTarget.value)}/>
        </Box>
        {type === 'product' && <Box className="studio-catalogue-filter">
          <Select aria-label="Filter by category" value={category} onChange={event => setCategory(event.currentTarget.value)}>
            <option value="">All categories</option>
            {categories.map(item => <option key={item._id} value={item._id}>{item.name}</option>)}
          </Select>
        </Box>}
        {hasFilters && <Button mode="bleed" text="Clear filters" onClick={() => {setSearch(''); setCategory('');}}/>}
        <div className="studio-catalogue-count" role="status">
          {!loading && <Text size={1} muted>{hasFilters ? `${filtered.length} of ${rows.length}` : rows.length} {rows.length === 1 ? 'item' : 'items'}</Text>}
        </div>
      </div>
      <div className="studio-catalogue-scroll" role="region" aria-label={title + ' table'} tabIndex={filtered.length ? 0 : undefined}>
        {loading ? <Flex padding={5} justify="center"><Spinner/></Flex> : filtered.length ? <table className="studio-document-table">
          <thead><tr>
            {type === 'product' && <th>Product</th>}
            {type === 'product' && <th>Category</th>}
            {type === 'productCategory' && <th>Category</th>}
            {type === 'productCategory' && <th>Slug</th>}
            <th>Publishing</th><th>Actions</th>
          </tr></thead>
          <tbody>{filtered.map(row => {
            const isProduct = type === 'product';
            const product = row as ProductRow;
            const categoryRow = row as CategoryRow;
            const name = row.name || (isProduct ? 'Untitled product' : 'Untitled category');
            return <tr key={row._id} onClick={() => open(row._id)}>
              {isProduct && <td><Flex align="center" gap={3}>
                <div className="studio-table-thumb">{product.imageUrl ? <img src={product.imageUrl} alt=""/> : <ImageIcon size={19}/>}</div>
                <Stack gap={2}><Text weight="semibold">{name}</Text><Text size={1} muted>{product.slug ? '/' + product.slug : 'No slug'}</Text></Stack>
              </Flex></td>}
              {isProduct && <td><Text size={1} muted={!product.category}>{product.category || 'Unassigned'}</Text></td>}
              {!isProduct && <td><Flex align="center" gap={3}><span className="studio-table-thumb"><Tag size={17} aria-hidden="true"/></span><Text weight="semibold">{name}</Text></Flex></td>}
              {!isProduct && <td><code className="studio-catalogue-slug">{categoryRow.slug ? '/' + categoryRow.slug : 'No slug'}</code></td>}
              <td><Inline gap={2}><Badge tone={row.isDraft ? 'caution' : 'positive'}>{row.isDraft ? 'Draft' : 'Published'}</Badge>{isProduct && product.visible === false && <Badge tone="default">Hidden on website</Badge>}</Inline></td>
              <td><Button mode="ghost" icon={Pencil} text="Edit" aria-label={'Edit ' + name} onClick={event => {event.stopPropagation(); open(row._id);}}/></td>
            </tr>;
          })}</tbody>
        </table> : <Stack padding={5} gap={3}>
          <Heading size={2}>{search || category ? 'No matching documents' : 'Nothing here yet'}</Heading>
          <Text muted>{search || category ? 'Try another search or category filter.' : 'Create a document to add it to your catalogue.'}</Text>
        </Stack>}
      </div>
    </Card>
  </Box>;
}
