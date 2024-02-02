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
  MaterialPageAttributes,
  MaterialPageAttributesValues,
  MaterialPageType,
} from "../types/pagesTypes";
import { Spin } from "antd";

const MaterialPage: React.FC = () => {
  const [material, setMaterial] = useState<MaterialPageType>();
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams();
  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const response = await http.get<MaterialPageType>(
        `API/v1/wiki/materials/${id}/`
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
          <h2>{material?.value}</h2>
        </MaterialHeader>

        <DescriptionBlock>
          <MaterialFeatures>
            {material?.attributes
              .slice(0, 5)
              .map((attribute: MaterialPageAttributes) => (
                <FeatureLine key={`description:${material.id}`}>
                  <FeatureName>
                    {attribute.translated_attribute_name}:{" "}
                  </FeatureName>
                  {attribute.values[0].translated_value}
                </FeatureLine>
              ))}
          </MaterialFeatures>
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
        <FullSpecsWrapper style={{ alignItems: "flex-start" }}>
          <h2>Идентификация и функциональность</h2>
          {material?.attributes
            .slice(5, 10)
            .map((attribute: MaterialPageAttributes) => (
              <FeatureLine key={`featureLine:${material.id}`}>
                <FeatureName>
                  {attribute.translated_attribute_name}:{" "}
                </FeatureName>
                {attribute.values[0].translated_value}
              </FeatureLine>
            ))}
          {/* <Line /> */}
          {/* <MolecularStructureBlock>
          <FeatureName>{data.molucalarPicture.key}</FeatureName>
          <img
            src={data.molucalarPicture.value}
            alt="Molecular Structure picture"
          ></img>
        </MolecularStructureBlock> */}
          <Line />
          <h2>Особенности и преимущества</h2>
          {material?.attributes
            .slice(11, 12)
            .map((attribute: MaterialPageAttributes) => (
              <FeatureLine>
                <FeatureName key={`featuresAndBenefits:${material.id}`}>
                  {attribute.translated_attribute_name}:{" "}
                </FeatureName>
                {attribute.values[0].translated_value}
              </FeatureLine>
            ))}
          <Line />
          <h2>Приложения и виды использования</h2>
          {material?.attributes
            .slice(13, 23)
            .map((attribute: MaterialPageAttributes) => (
              <FeatureLine>
                <FeatureName key={`featuresAndBenefits:${material.id}`}>
                  {attribute.translated_attribute_name}:{" "}
                </FeatureName>
                {attribute.values[0].translated_value}
              </FeatureLine>
            ))}
          {material?.attributes
            .slice(13, 23)
            .map((attribute: MaterialPageAttributes) => (
              <>
                {attribute.values.length == 1 ? (
                  <FeatureLine>
                    <FeatureName key={`ApplicationsAndUses:${material.id}`}>
                      {attribute.translated_attribute_name}:{" "}
                    </FeatureName>
                    {attribute.values[0].translated_value}
                  </FeatureLine>
                ) : (
                  <ExtendedBlock>
                    <FeatureName key={`ApplicationsAndUses:${material.id}`}>
                      {attribute.translated_attribute_name}:{" "}
                    </FeatureName>
                    <FeatureLine>
                      {attribute.values.map(
                        (attribute: MaterialPageAttributesValues) => (
                          <Wrapper
                            key={`ApplicationsAndUses:wrapper:${attribute.translated_value}`}
                          >
                            <FeatureLine>
                              {attribute.translated_value}
                            </FeatureLine>
                          </Wrapper>
                        )
                      )}
                    </FeatureLine>
                  </ExtendedBlock>
                )}
              </>
            ))}
          <Line />
          <Table>
            <TableColumn>
              <TableColumnTittle>
                <p style={{ color: "#ffffff" }}>Характеристика</p>
              </TableColumnTittle>
              <TableColumnContent>
                <p style={{ color: "#000000" }}>Значение</p>
              </TableColumnContent>
              <TableColumnContent>
                <p style={{ color: "#000000" }}>Единица измерения</p>
              </TableColumnContent>
              <TableColumnContent>
                <p style={{ color: "#000000" }}>Content</p>
              </TableColumnContent>
            </TableColumn>
            <TableColumn>
              <TableColumnTittle>
                <p style={{ color: "#ffffff" }}>Значение</p>
              </TableColumnTittle>
              <TableColumnContent>
                <p style={{ color: "#000000" }}>Content</p>
              </TableColumnContent>
              <TableColumnContent>
                <p style={{ color: "#000000" }}>Content</p>
              </TableColumnContent>
              <TableColumnContent>
                <p style={{ color: "#000000" }}>Content</p>
              </TableColumnContent>
            </TableColumn>
            <TableColumn>
              <TableColumnTittle>
                <p style={{ color: "#ffffff" }}>Единица измерения</p>
              </TableColumnTittle>
              <TableColumnContent>
                <p style={{ color: "#000000" }}>Content</p>
              </TableColumnContent>
              <TableColumnContent>
                <p style={{ color: "#000000" }}>Content</p>
              </TableColumnContent>
              <TableColumnContent>
                <p style={{ color: "#000000" }}>Content</p>
              </TableColumnContent>
            </TableColumn>
            <TableColumn>
              <TableColumnTittle>
                <p style={{ color: "#ffffff" }}>Метод / условия испытания</p>
              </TableColumnTittle>
              <TableColumnContent>
                <p style={{ color: "#000000" }}>Content</p>
              </TableColumnContent>
              <TableColumnContent>
                <p style={{ color: "#000000" }}>Content</p>
              </TableColumnContent>
              <TableColumnContent>
                <p style={{ color: "#000000" }}>Content</p>
              </TableColumnContent>
            </TableColumn>

            {/* {material?.attributes.map((attribute) => (
                <TableContent>
                  <TableContentItem>
                    {attribute.attribute_name}
                  </TableContentItem>
                  <TableContentItem>
                    {attribute.values[0].translated_value}
                  </TableContentItem>
                  <TableContentItem>{attribute.units}</TableContentItem>
                  <TableContentItem>
                    {attribute.test_method_conditions}
                  </TableContentItem>
                </TableContent>
              ))} */}
          </Table>
        </FullSpecsWrapper>
      </FullSpecsBG>
    </>
  );
};

const TableColumnContent = styled.div`
  background-color: #cbcbcb;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;
`;

const TableColumnTittle = styled.div`
  background-color: #00a99d;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;
`;

const TableColumn = styled.div`
  width: auto;

  box-sizing: border-box;
`;

const Table = styled.div`
  display: flex;
  flex-direction: row;

  overflow: hidden;
  border-radius: 5px 5px 0 0;

  margin-bottom: 100px;
`;

const FullSpecsBG = styled.div`
  background-color: #fbfbfb;
  width: 100%;
`;

const ExtendedBlock = styled.div`
  display: flex;
  gap: 10px;
`;

const MaterialHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  align-items: center;

  margin: 0 auto;
  max-width: 1440px;

  padding-top: 30px;

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

  max-width: 800px;

  p:first-child {
    margin-bottom: 30px;
    font-size: 19px;
  }
  margin: none;
`;

const MaterialFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FeatureLine = styled.p`
  color: #505050;
`;

const FeatureName = styled.span`
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
