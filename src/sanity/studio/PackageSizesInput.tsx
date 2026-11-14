import {AddIcon} from '@sanity/icons/Add';
import {ArrowDownIcon} from '@sanity/icons/ArrowDown';
import {ArrowUpIcon} from '@sanity/icons/ArrowUp';
import {TrashIcon} from '@sanity/icons/Trash';
import {Button, Box, Flex, Text, TextInput} from '@sanity/ui';
import type {ArrayOfPrimitivesInputProps} from 'sanity';
import {set} from 'sanity';

/** A direct text-entry editor for the product's string-array package sizes. */
export function PackageSizesInput(props: ArrayOfPrimitivesInputProps) {
  const sizes = (props.value ?? []) as string[];
  const rows = sizes.length ? sizes : [''];

  function updateSize(index: number, value: string) {
    const next = [...sizes];
    if (next.length === 0) next.push(value);
    else next[index] = value;

    // Keep the field empty when the only visible input is cleared.
    props.onChange(set(next.length === 1 && next[0] === '' ? [] : next));
  }

  function moveSize(index: number, offset: -1 | 1) {
    const target = index + offset;
    if (target < 0 || target >= sizes.length) return;
    const next = [...sizes];
    [next[index], next[target]] = [next[target], next[index]];
    props.onChange(set(next));
  }

  return (
    <Flex direction="column" gap={3}>
      <Flex direction="column" gap={2}>
        {rows.map((size, index) => (
          <div key={index} style={{display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
            <Box flex={1} style={{flex: '1 1 160px', minWidth: 0, maxWidth: '100%'}}>
              <TextInput
                {...(index === 0 ? props.elementProps : {})}
                aria-label={`Package size ${index + 1}`}
                placeholder={index === 0 ? 'e.g. 250 g' : 'e.g. 500 g'}
                value={size ?? ''}
                readOnly={props.readOnly}
                style={{width: '100%'}}
                onChange={event => updateSize(index, event.currentTarget.value)}
              />
            </Box>
            <div style={{display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0}}>
              {sizes.length > 1 && <>
                <Button
                  aria-label={`Move package size ${index + 1} up`}
                  title="Move up"
                  mode="bleed"
                  icon={ArrowUpIcon}
                  disabled={props.readOnly || index === 0}
                  onClick={() => moveSize(index, -1)}
                />
                <Button
                  aria-label={`Move package size ${index + 1} down`}
                  title="Move down"
                  mode="bleed"
                  icon={ArrowDownIcon}
                  disabled={props.readOnly || index === sizes.length - 1}
                  onClick={() => moveSize(index, 1)}
                />
              </>}
              {sizes.length > 0 && <Button
                aria-label={`Remove package size ${index + 1}`}
                title="Remove package size"
                mode="bleed"
                tone="critical"
                icon={TrashIcon}
                disabled={props.readOnly}
                onClick={() => props.onItemRemove(index)}
              />}
            </div>
          </div>
        ))}
      </Flex>
      <Button
        type="button"
        mode="ghost"
        icon={AddIcon}
        text="Add size"
        disabled={props.readOnly}
        onClick={() => props.onItemAppend('')}
      />
      <Text size={1} muted>Type each actual package size in its box. Add another row for additional sizes.</Text>
    </Flex>
  );
}
