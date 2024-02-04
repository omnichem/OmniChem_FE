import styled from "styled-components";
// import SupplierCard from "../components/SupplierCard";
// import { suppliersData } from "../const/data";
import { useEffect, useState } from "react";
import SamplesForm from "./DrawerPages/SamplesForm";
import QuoteForm from "./DrawerPages/QuoteForm";
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { AuthContainer, PageWrapper } from "./MaterialCardsPage";
import { http } from "../const/http";
import {
  MaterialPageType, MaterialTableRows,
} from "../types/pagesTypes";
import { columns } from "../const/tableData";
import { DataType } from "../types/componentsTypes";
import { Spin } from "antd";
import { CustomButton, CustomDrawer, CustomInput, CustomTable, Header, Logo } from "../components";
// import CustomCarousel from "../components/CustomCarousel";
// import StickyComponent from "../components/StickyMaterialHeader";

const MaterialDescriptionPage: React.FC = () => {
  const [material, setMaterial] = useState<MaterialPageType>();
  const [isLoading, setIsLoading] = useState(false)
  const [materialTable, setMaterialTable] = useState<MaterialTableRows[]>([{
    field_name: "",
      field_value: "",
      units: "",
      test_method: null
  }])
  const { id } = useParams();
  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const response = await http.get<MaterialPageType>(
        `API/v2/wiki/materials/${id}/`
      );

      setMaterial(response.data);
      setMaterialTable(response.data.tables[0].table_rows)
      setIsLoading(false)
    };
    fetchData();
  }, [id]);

  
  const [searchState, setSearchState] = useState("");
  const navigate = useNavigate();
  const [openQuoteRequest, setOpenQuoteRequest] = useState(false);
  const [openSampleRequest, setOpenSampleRequest] = useState(false);
  // const showQuoteRequest = () => {
  //   setOpenQuoteRequest(true);
  // };

  // const showSampleRequest = () => {
  //   setOpenSampleRequest(true);
  // };

  const onCloseQuoteRequest = () => {
    setOpenQuoteRequest(false);
  };

  const onCloseSampleRequest = () => {
    setOpenSampleRequest(false);
  };

  const [quoteFormStage, setQuoteFormStage] = useState(1);
  const [samplesFormStage, setSamplesFormStage] = useState(1);

  const submitQuote = () => {
    setQuoteFormStage(2);
  };

  const submitSamples = () => {
    setSamplesFormStage(2);
  };


  
  return (
    <div>
    
      <CustomDrawer
        open={openQuoteRequest}
        onClose={onCloseQuoteRequest}
        size="default"
        placement="right"
        title="Запрос ценового предложения"
      >
        {quoteFormStage == 1 ? (
          <QuoteForm onQuoteSubmit={() => submitQuote()} />
        ) : (
          <div>
            <p>Ваш запрос был отправлен поставщику</p>
            <CustomButton
              type="default"
              onClick={() => location.reload()}
              text="Продолжить"
            />
          </div>
        )}
      </CustomDrawer>
      <CustomDrawer
        open={openSampleRequest}
        onClose={onCloseSampleRequest}
        size="default"
        placement="right"
        title="Запрос образца"
      >
        {samplesFormStage == 1 ? (
          <SamplesForm onSamplesSubmit={() => submitSamples()} />
        ) : (
          <div>
            <p>Ваш запрос был отправлен поставщику</p>
            <CustomButton
              type="default"
              onClick={() => location.reload()}
              text="Продолжить"
            />
          </div>
        )}
      </CustomDrawer>

      <Header>
      <Logo height={36} width={170}/>
        <CustomInput
          name=""
          placeholder="Введите то, что вы хотите найти"
          onChange={setSearchState}
          value={searchState}
          addonBefore={<SearchOutlined />}
        />
        <AuthContainer>
        <CustomButton type="text" text="Войти в систему" onClick={()=> navigate('/login-selection')}/>
        <CustomButton type="primary" text="Зарегистрироваться" onClick={()=> navigate('/register-selection')}/>
        </AuthContainer>
      </Header>
      {
      isLoading ? <Spin fullscreen={true} size="large"/> : <>
      <PageWrapper style={{ alignItems: "flex-start" }}>
        
        <MaterialHeader>
          <CustomButton
            type="primary"
            shape="round"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/")}
          />
          <h2>{material?.name}</h2>
        </MaterialHeader>
      
        <DescriptionBlock>
          <FeatureLine>
            {material?.translated_description}
          </FeatureLine>
          
        </DescriptionBlock>
        {/* <Line /> */}
        {/* <h2>Поставщики:</h2>
        <CarouselWrapper>
        <CustomCarousel slidesToShow={4}>
        {suppliersData.length == 0 ? (
            <h2>В настоящее время у этого сырья нет поставщиков</h2>
          ) : (
            suppliersData.map((supplier) => {
              const items = [
                {
                  key: supplier.supplierName,
                  label: supplier.supplierName,
                  children: (
                    <div>
                      <p>Seller city: {supplier.city}</p>
                      <p>Legal entity: {supplier.legalEntity}</p>
                      <p>Main advantages: {supplier.mainAdvantages}</p>
                      <p>Brief description:{supplier.briefDescription}</p>
                    </div>
                  ),
                },
              ];
              return (
                <SupplierCard
                  key={`supplierCard:${supplier.id}`}
                  items={items}
                  sampleRequest={showSampleRequest}
                  quoteRequest={showQuoteRequest}
                />
              );
            })
          )}
        </CustomCarousel>
        </CarouselWrapper> */}
        
        
      </PageWrapper>
      <FullSpecsBG>
        <FullSpecsWrapper >
              {material?.attributes.map((attribute)=> (
                <>
                <FeatureWrapper>
                  <FeatureNameContainer>
                  <FeatureName>
                    {attribute.attribute_name}: 
                  </FeatureName>
                  </FeatureNameContainer>
                  
                  <FeatureLineContainer key={`featureLineContainer:${attribute.attribute_name}`}>
                  {
                    attribute.attribute_values.map((attributeValues) => (
                      <FeatureLine>{attributeValues}</FeatureLine>
                    ))
                  }
                  </FeatureLineContainer>
                  
                </FeatureWrapper>
                <Line/>
                </>
              ))}
          <CustomTable size="large" columns={columns} data={materialTable?.map((tableRow) => {
              const data: DataType =
                {
                  key: tableRow.field_name,
                  name: tableRow.field_name,
                  value: tableRow.field_value,
                  unit: tableRow.units,
                  method: tableRow.test_method,
                }
              return data
            })}/>
          <Line/>
        </FullSpecsWrapper>
      </FullSpecsBG>
      </>
    }
      
      
    </div>
  );
};

// const CarouselWrapper = styled.div`
//   width:100%;
//   margin-bottom: 30px;
  

// `

const FeatureNameContainer = styled.div`
width: 360px
`
const FeatureLineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

`
const FeatureWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  @media (min-width: 320px) and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 20px;

    max-width: 310px;}
`

const FullSpecsBG = styled.div`
  background-color: #fbfbfb;
  width: 100%;
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

const DescriptionBlock = styled.p`
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

const FeatureLine = styled.p`
  color: #505050;
  /* white-space: nowrap; */
`;

const FeatureName = styled.span`
font-size: 20px;
  font-weight: 700;
  color: #505050;
  
`;

export const ScrollableList = styled.div`
  width: 100%;
  margin-bottom: 30px;
  padding: 10px;

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
export default MaterialDescriptionPage;