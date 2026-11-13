import {Card} from '@sanity/ui';
import type {ObjectInputProps} from 'sanity';

export function CatalogueForm(props: ObjectInputProps) {
  return (
    <Card className="catalogue-studio-form">
      {props.renderDefault(props)}
    </Card>
  );
}
