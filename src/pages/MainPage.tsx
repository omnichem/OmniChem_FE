import styled from "styled-components";
import Header from "../components/Header";
import MaterialCard from "../components/MaterialCard/MaterialCard";
import { useEffect, useState } from "react";
import { CardStyle, Material } from "../type";
import CustomInput from "../components/Input/CustomInput";
import axios from "axios";

import DropDownMenu from "../components/DropDownMenu";

import { useNavigate } from "react-router";
import { SearchOutlined } from "@ant-design/icons";

const quickFilters = [
  {
    key: "1",
    label: <p>Filter 1</p>,
  },
  {
    key: "2",
    label: <p>Filter 2</p>,
  },
  {
    key: "3",
    label: <p>Filter 3</p>,
  },
];

const MainPage = () => {
  const [materials, setMaterials] = useState<Material[]>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<Material[]>(
        `https://my-json-server.typicode.com/Solnyshko-eto-ya/jsonServer/data`
      );
      setMaterials(response.data);
    };

    fetchData();
  }, []);

  const [styleType, setStyleType] = useState<CardStyle>(CardStyle.UN_WRAP);

  const clickButton = () => {
    if (styleType === CardStyle.ROLL_UP) {
      setStyleType(CardStyle.UN_WRAP);
      setIsOpen(true);
    } else {
      setStyleType(CardStyle.ROLL_UP);
      setIsOpen(false);
    }
  };

  // useEffect(() => {});
  // Решит ли проблему заедания кнопки развертывания карточки сырья?

  const navigate = useNavigate();

  return (
    <>
      <Header>
        <CustomInput
          name=""
          placeholder="Input what you want to find"
          onChange={() => {}}
          value={""}
          prefix={<SearchOutlined />}
        />
      </Header>
      <PageWrapper>
        <FiltersContainer>
          <DropDownMenu items={quickFilters} filterText="Features" />
          <DropDownMenu items={quickFilters} filterText="Suppliers" />
          <DropDownMenu items={quickFilters} filterText="End Uses" />
          <DropDownMenu items={quickFilters} filterText="Chemical Family" />
          <DropDownMenu
            items={quickFilters}
            filterText="Compatible Substrates & Surfaces"
          />

          <DropDownMenu
            items={quickFilters}
            filterText="Ready to Use Product Type"
          />
        </FiltersContainer>
        <MaterialsList>
          {materials?.map((material: Material) => (
            <MaterialCard
              onCardClick={() => navigate("/material")}
              link={"/material"}
              text={isOpen ? "More" : "Less"}
              key={material.id}
              manufacturerName={material.materialName}
              materialName={material.materialName}
              readyToUseProductType={material.readyToUseProductType}
              chemicalFamily={material.chemicalFamily}
              compatibleSubstratesAndSurfaces={
                material.compatibleSubstratesAndSurfaces
              }
              features={material.features}
              description={material.description}
              onClick={clickButton}
              styleType={styleType}
            />
          ))}
        </MaterialsList>
      </PageWrapper>
    </>
  );
};

export default MainPage;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const MaterialsList = styled.div`
  max-width: 1440px;

  display: grid;
  /* grid-auto-rows: minmax(min-content, max-content); */
  grid-gap: 1rem;
  margin: 0 auto;

  @media (min-width: 620px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 930px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1240px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1550px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 40px;
  min-width: 600px;

  border-radius: 5px;
  outline: 1px solid #6386a5;
  overflow: hidden;
  &:hover {
    outline: 1px solid #383a3b;
  }
  &:focus-within {
    outline: 1px solid #383a3b;
  }
  /* border: 1px solid #383a3b; */
`;

export const Categories = styled.div`
  height: 100%;

  flex: 1;

  background-color: #ffffff;
`;

export const InputIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 40px;

  padding: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
`;

export const VerticalDivider = styled.div`
  width: 0px;
  height: 24px;
  border-style: solid;
  border-width: 0px 0px 0px 2px;
  border-color: rgb(204, 204, 204);
`;

export const InputWrapper = styled.div`
  flex: 2;
`;

const FiltersContainer = styled.div`
  max-width: 1440px;
  height: 60px;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;

  margin: 0 auto;
`;
