import QuoteForm from '../../pages/DrawerPages/QuoteForm';
import SamplesForm from '../../pages/DrawerPages/SamplesForm';
import { CustomDrawer } from '../../shared/components';
import { RequestFormType } from './types';

interface MaterialRequestFormProps {
  requestType: RequestFormType;
  isOpenedForm: boolean;
  closeForm: () => void;
}

export const MaterialRequestForm: React.FC<MaterialRequestFormProps> = ({ requestType, isOpenedForm, closeForm }) => {
  return (
    <CustomDrawer
      size="large"
      title={requestType == 'quote' ? 'Запрос партии сырья' : 'Запрос образца сырья'}
      onClose={closeForm}
      open={isOpenedForm}
    >
      {requestType == 'quote' ? <QuoteForm /> : <SamplesForm />}
    </CustomDrawer>
  );
};
