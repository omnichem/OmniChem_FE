import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ArrowLeftOutlined, FilePdfOutlined, FileWordOutlined, LoadingOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router';
import { http } from '../shared/const/http';
import { MaterialPageType, MaterialTable, MaterialTableRows } from '../shared/types/pagesTypes';
import '../styles/loading.css';
import { columns } from '../shared/const/tableData';
import { DataType } from '../shared/types/componentsTypes';
import { Alert, Divider, Spin, Typography } from 'antd';
import { useAuth } from '../contexts/authContext';
import { CustomButton, SupplierCard, CustomTable } from '../shared/components';
import { MaterialRequestForm } from '../modules/material-request-form';
import { RequestFormType } from '../modules/material-request-form/types';
import { Market } from '../modules/material-request-form/material-request-form.module';
const { Text, Link } = Typography;
import Title from 'antd/es/typography/Title';

interface Supplier {
  distributor_id: number;
  distributor_name: string;
  availability_status: string;
  product_id: number;
  product_name: string;
}

export const MaterialDescriptionPage: React.FC = () => {
  const { isAuthorized } = useAuth();
  const [material, setMaterial] = useState<MaterialPageType>();
  const [isLoading, setIsLoading] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const { id } = useParams();
  const [markets, setMarkets] = useState<Market[]>([]);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const materialDescription = await http.get<MaterialPageType>(`API/v2/wiki/materials/${id}/`);

      const suppliersResponse = await http.get<Supplier[]>(`API/v1/commerce/materials/${id}/distributors/`);
      setMaterial(materialDescription.data);
      setSuppliers(suppliersResponse.data);

      setIsLoading(false);
      console.log(suppliersResponse.data);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchMarkets = async () => {
      const marketsResponse = await http.get<Market[]>(`/API/v1/commerce/markets/`);
      setMarkets(marketsResponse.data);
      console.log(marketsResponse.data);
    };

    fetchMarkets();
  }, []);

  const navigate = useNavigate();

  // const [isOpenInfReqModal, setIsOpenInfReqModal] = useState(false);
  // const openReqModal = () => {
  //   if (!isAuthorized) {
  //     openNotification();
  //   } else {
  //     setIsOpenInfReqModal(true);
  //   }
  // };

  // const closeReqModal = () => {
  //   setIsOpenInfReqModal(false);
  // };

  const [isOpenRequestForm, setIsOpenRequestForm] = useState(false);
  const [requestType, setRequestType] = useState<RequestFormType>('quote');
  const [productId, setProductId] = useState<number>(0);
  const [productName, setProductName] = useState<string>('');

  const openRequestForm = (requestType: RequestFormType, productId: number, productName: string) => {
    setIsOpenRequestForm(true);
    setRequestType(requestType);
    setProductId(productId);
    setProductName(productName);
  };
  return (
    <div>
      {/* <Modal
        open={isOpenInfReqModal}
        title="Напишите интересующий вас вопрос сдесь"
        onCancel={closeReqModal}
        footer={false}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <TextArea rows={4} />
          <Alert message="Помимо вашего вопроса, мы отправим поставщику данные о вас: имя, фамилия и ИНН. Предоставление этих данных при запросе к поставщику поможет обеспечить более качественное обслуживание и улучшить коммуникацию." />
          <CustomButton text="Отправить" type="primary"></CustomButton>
        </div> */}
      {/* В дальнейшем при клике в модалке должен быть получен id поставщика что бы отправить ему запрос, получить его надо из карточки */}
      {/* </Modal> */}
      <MaterialRequestForm
        closeForm={() => setIsOpenRequestForm(false)}
        isOpenedForm={isOpenRequestForm}
        requestType={requestType}
        markets={markets}
        productName={productName}
        productId={productId}
      />
      {isLoading ? (
        <Spin style={{ zIndex: '9' }} indicator={<LoadingOutlined />} fullscreen={true} size="large" />
      ) : (
        <div>
          <PageWrapper style={{ alignItems: 'flex-start', paddingTop: '40px' }}>
            <MaterialHeader>
              <CustomButton type="primary" shape="round" icon={<ArrowLeftOutlined />} onClick={() => navigate('/')} />
              <Title level={2}>{material?.name}</Title>
            </MaterialHeader>

            <DescriptionBlock>
              <FeatureLine>{material?.translated_description}</FeatureLine>
            </DescriptionBlock>
            {/* <SpecsTable /> */}
            <Divider style={{ margin: 0 }} />
            <Title level={2}>Документы:</Title>
            {isAuthorized ? (
              <div>
                {material?.documents.map(document => {
                  return (
                    <div>
                      {document.name.substring(document.name.length - 3) == 'pdf' ? (
                        <DocumentWrapper>
                          <FilePdfOutlined style={{ fontSize: '30px' }} />

                          <Link style={{ fontSize: '20px' }} href={document.document}>
                            {document.name}
                          </Link>
                        </DocumentWrapper>
                      ) : (
                        <DocumentWrapper>
                          <FileWordOutlined />
                          <Link href={document.document}>{document.name}</Link>
                        </DocumentWrapper>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <Alert message="Только зарегистрированные пользователи могут видеть документы по сырью" />
            )}
            <Divider style={{ margin: 0 }} />
            <Title level={2}>Поставщики:</Title>
            {isAuthorized ? (
              <div>
                <ScrollableList>
                  {suppliers?.map(supplier => {
                    return (
                      <SupplierCard
                        availability={supplier.availability_status}
                        key={supplier.distributor_id}
                        cardTittle={supplier.distributor_name}
                        sampleRequest={() => openRequestForm('sample', supplier.product_id, supplier.product_name)}
                        quoteRequest={() => openRequestForm('quote', supplier.product_id, supplier.product_name)}
                        informationRequest={() => {}}
                      />
                    );
                  })}
                </ScrollableList>
              </div>
            ) : (
              <Alert message="Только зарегистрированные пользователи могут видеть поставщиков сырья" />
            )}
          </PageWrapper>
          <FullSpecsBG>
            <FullSpecsWrapper>
              {material?.attributes?.map(attribute => (
                <>
                  <FeatureWrapper>
                    <FeatureNameContainer>
                      <FeatureName>{attribute.attribute_name}:</FeatureName>
                    </FeatureNameContainer>
                    <FeatureLineContainer key={`featureLineContainer:${attribute.attribute_name}`}>
                      {attribute.attribute_values.map(attributeValues => (
                        <FeatureLine>{attributeValues}</FeatureLine>
                      ))}
                    </FeatureLineContainer>
                  </FeatureWrapper>
                  <Divider style={{ margin: 0 }} />
                </>
              ))}
              {material?.tables.map((table: MaterialTable) => {
                const tableData = table.table_rows.map((table_row: MaterialTableRows) => {
                  const rowData: DataType = {
                    key: table_row.field_name,
                    name: table_row.field_name,
                    value: table_row.field_value,
                    unit: table_row.units,
                    method: table_row.test_method,
                  };
                  return rowData;
                });
                return <CustomTable size="large" columns={columns} data={tableData} />;
              })}
              <Line />
            </FullSpecsWrapper>
          </FullSpecsBG>
        </div>
      )}
    </div>
  );
};

const DocumentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  height: 50px;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  margin: 0 auto;

  max-width: 1440px;

  @media (min-width: 320px) and (max-width: 768px) {
    display: flex;

    gap: 20px;

    max-width: 310px;

    .dropDown {
      width: 100%;
    }
  }
`;
const FeatureNameContainer = styled.div`
  width: 360px;
`;
const FeatureLineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const FeatureWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  @media (min-width: 320px) and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 20px;

    max-width: 310px;
  }
`;

const FullSpecsBG = styled.div`
  background-color: #fbfbfb;
  width: 100%;
  margin-top: 40px;
`;

const MaterialHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  max-width: 1440px;

  align-items: center;
`;

const Line = styled.div`
  border-bottom: 1px solid #d6d6d6;
  width: 100%;
`;

const FullSpecsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  margin: 0 auto;
  max-width: 1440px;

  padding-top: 30px;

  overflow-wrap: break-word;

  @media (min-width: 320px) and (max-width: 768px) {
    display: flex;
    gap: 20px;

    max-width: 310px;

    .dropDown {
      width: 100%;
    }
  }

  background-color: #fbfbfb;
`;

const DescriptionBlock = styled(Text)`
  display: flex;
  flex-direction: column;
  gap: 10px;

  max-width: 1440px;

  p:first-child {
    margin-bottom: 30px;
    font-size: 19px;
  }
  margin: none;
`;

const FeatureLine = styled(Text)`
  color: #505050;
`;

const FeatureName = styled(Text)`
  font-size: 20px;
  font-weight: 700;
  color: #505050;
`;

export const ScrollableList = styled.div`
  width: 100%;
  padding: 10px 10px 50px 10px;

  display: flex;
  flex-direction: row;
  gap: 20px;

  box-sizing: border-box;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  box-shadow: 0px 0px 10px 2px rgba(255, 255, 255, 0.2) inset;
`;
