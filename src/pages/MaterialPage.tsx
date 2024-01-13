import Header from "../components/Header";
import Input from "../components/Input/CustomInput";
import styled from "styled-components";
import SupplierCard from "../components/SupplierCard";
import { data } from "../const/data";
import CustomDrawer from "../components/CustomDrawer";
import { useState } from "react";

import SamplesForm from "./DrawerPages/SamplesForm";
import Button from "../components/CustomButton";
import QuoteForm from "./DrawerPages/QuoteForm";
import CustomButton from "../components/CustomButton";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const MaterialPage = () => {
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

  return (
    <>
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
            <p>Your request has been sent to the supplier</p>
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
        title="SampleRequest"
      >
        {samplesFormStage == 1 ? (
          <SamplesForm onSamplesSubmit={() => submitSamples()} />
        ) : (
          <div>
            <p>Your request has been sent to the supplier</p>
            <Button
              type="default"
              onClick={() => location.reload()}
              text="Продолжить"
            />
          </div>
        )}
      </CustomDrawer>

      <Header>
        <p>OmniChem</p>

        <Input
          name=""
          placeholder="Enter what you want to find"
          onChange={setSearchState}
          value={searchState}
        />
      </Header>
      <MaterialPageWrapper>
        <MaterialHeader>
          <CustomButton
            type="primary"
            shape="round"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/")}
          />
          <h2>{data.name}</h2>
        </MaterialHeader>

        <DescriptionBlock>
          <Description>{data.descriptionHeader}</Description>
          <MaterialFeatures>
            {data.description.map(({ key, value }) => (
              <FeatureLine key={key}>
                <FeatureName>{key}: </FeatureName>
                {value}
              </FeatureLine>
            ))}
          </MaterialFeatures>
        </DescriptionBlock>
        <Line />
        <h2>Suppliers:</h2>

        <ScrollableList>
          {data.suppliers.map((supplier) => {
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
                key={data.id}
                items={items}
                sampleRequest={showSampleRequest}
                quoteRequest={showQuoteRequest}
              />
            );
          })}
        </ScrollableList>
      </MaterialPageWrapper>
      <FullSpecsWrapper>
        <h2>Identification & Functionality</h2>
        {data.IdentificationAndFunctionality.map(({ key, value }) => (
          <FeatureLine key={key}>
            <FeatureName>{key}: </FeatureName>
            {value}
          </FeatureLine>
        ))}
        <Line />
        <MolecularStructureBlock>
          <FeatureName>{data.molucalarPicture.key}</FeatureName>
          <img
            src={data.molucalarPicture.value}
            alt="Molecular Structure picture"
          ></img>
        </MolecularStructureBlock>
        <Line />
        <h2>Features & Benefits</h2>
        {data.FeaturesAndBenefits.map(({ key, value }) => (
          <FeatureLine>
            <FeatureName>{key}: </FeatureName>
            {value}
          </FeatureLine>
        ))}
        <Line />
        <h2>Applications & Uses</h2>
        {data.ApplicationsAndUses.map(({ key, value }) => (
          <>
            {typeof value === "string" ? (
              <FeatureLine>
                <FeatureName>{key}: </FeatureName>
                {value}
              </FeatureLine>
            ) : (
              <ExtendedBlock>
                <FeatureName>{key}: </FeatureName>
                <FeatureLine>
                  {value.map(({ key, value }) => (
                    <Wrapper key={key}>
                      <FeatureName>{key}</FeatureName>
                      <p>{value}</p>
                    </Wrapper>
                  ))}
                </FeatureLine>
              </ExtendedBlock>
            )}
          </>
        ))}
        <Line />
      </FullSpecsWrapper>
    </>
  );
};

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

const MaterialPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 120px 10px 120px;
`;

const Line = styled.div`
  border-bottom: 1px solid #d6d6d6;

  margin: 20px 0 20px 0;
`;

const MolecularStructureBlock = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const FullSpecsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 30px 120px 10px 120px;

  height: auto;

  background-color: #fbfbfb;
`;

const Description = styled.p`
  margin: 20px 0 20px 0;

  font-weight: 200;
  word-spacing: 1px;
  color: #2a2b2d;
`;

const DescriptionBlock = styled.p`
  display: flex;
  flex-direction: column;
  gap: 10px;

  max-width: 800px;
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

const ScrollableList = styled.div`
  width: 100%;
  margin: 30px 0;
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
