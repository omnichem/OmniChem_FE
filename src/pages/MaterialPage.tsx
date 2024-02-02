import Header from "../components/Header";
import Input from "../components/Input/CustomInput";
import styled from "styled-components";
import SupplierCard from "../components/SupplierCard";
import { suppliersData } from "../const/data";
import CustomDrawer from "../components/CustomDrawer";
import { useEffect, useState } from "react";

import SamplesForm from "./DrawerPages/SamplesForm";
import Button from "../components/CustomButton";
import QuoteForm from "./DrawerPages/QuoteForm";
import CustomButton from "../components/CustomButton";
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { PageWrapper } from "./MainPage";
import { http } from "../const/http";
import {
  MaterialPageType,
} from "../types/pagesTypes";
import { Spin } from "antd";
import CustomTable from "../components/CustomTable";
import { columns, data } from "../const/tableData";

const MaterialPage: React.FC = () => {
  const [material, setMaterial] = useState<MaterialPageType>();
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams();
  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const response = await http.get<MaterialPageType>(
        `http://localhost:8000/API/v2/wiki/materials/${id}`
      );

      setMaterial(response.data);
      setIsLoading(false)
    };
    fetchData();
  }, [id]);

  console.log(material);
  const [searchState, setSearchState] = useState("");
  const navigate = useNavigate();
  const [openQuoteRequest, setOpenQuoteRequest] = useState(false);
  const [openSampleRequest, setOpenSampleRequest] = useState(false);
  const showQuoteRequest = () => {
    setOpenQuoteRequest(true);
  };

  const showSampleRequest = () => {
    setOpenSampleRequest(true);
  };

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

  // const columns = [
  //   {
  //     title: "Характеристика",
  //     dataIndex: "characteristic",
  //     key: "characteristic",
  //     render: (text) => <a>{text}</a>,
  //   },
  //   {
  //     title: "Значение",
  //     dataIndex: "value",
  //     key: "value",
  //   },
  //   {
  //     title: "Единица измерения",
  //     dataIndex: "units",
  //     key: "units",
  //   },
  //   {
  //     title: "Метод / Условия испытания",
  //     dataIndex: "test_method_conditions",
  //     key: "test_method_conditions",
  //   },
  // ];



  return (
    <>
    {
      isLoading ? <Spin fullscreen={true} size="large"/> : <></>
    }
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
            <Button
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
            <Button
              type="default"
              onClick={() => location.reload()}
              text="Продолжить"
            />
          </div>
        )}
      </CustomDrawer>

      <Header>
        <h1>OmniChem</h1>

        <Input
          name=""
          placeholder="Введите то, что вы хотите найти"
          onChange={setSearchState}
          value={searchState}
          addonBefore={<SearchOutlined />}
        />
      </Header>
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
        <Line />
        <h2>Поставщики:</h2>

        <ScrollableList>
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
        </ScrollableList>
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
                  
                  <FeatureLineContainer>
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
          <CustomTable size="large" columns={columns} data={data}/>
          <Line/>
        </FullSpecsWrapper>
      </FullSpecsBG>
    </>
  );
};

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
`

const FullSpecsBG = styled.div`
  background-color: #fbfbfb;
  width: 100%;
`;

const MaterialHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  align-items: center;
`;

const Line = styled.div`
  border-bottom: 1px solid #d6d6d6;
  width: 100%;
`;

// const MolecularStructureBlock = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 30px;
// `;

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

// const Description = styled.p`
//   margin: 20px 0 20px 0;

//   font-weight: 200;
//   word-spacing: 1px;
//   color: #2a2b2d;
// `;

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

  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  box-shadow: 0px 0px 10px 2px rgba(255, 255, 255, 0.2) inset;
`;
export default MaterialPage;
