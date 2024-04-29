import { CustomDrawer } from '../../shared/components';
import { QuoteForm } from '../quote-request-form';
import { SamplesForm } from '../sample-request-form';
import { RequestFormType } from './types';

export interface Market {
  id: number;
  market_name: string;
}

interface MaterialRequestFormProps {
  requestType: RequestFormType;
  isOpenedForm: boolean;
  closeForm: () => void;
  markets: Market[];
  productName: string;
  productId: number;
}

export const MaterialRequestForm: React.FC<MaterialRequestFormProps> = ({
  requestType,
  isOpenedForm,
  closeForm,
  markets,
  productId,
  productName,
}) => {
  return (
    <CustomDrawer
      size="large"
      title={
        requestType == 'quote'
          ? `Запрос ценового предложения по сырью: ${productName}`
          : `Запрос образца сырья: ${productName}`
      }
      onClose={closeForm}
      open={isOpenedForm}
    >
      {requestType == 'quote' ? (
        <QuoteForm markets={markets} productId={productId} productName={productName} />
      ) : (
        <SamplesForm markets={markets} productId={productId} />
      )}
    </CustomDrawer>
  );
};
