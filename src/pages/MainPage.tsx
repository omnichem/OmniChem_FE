import styled from "styled-components";
import Header from "../components/Header";
import MaterialCard from "../components/MaterialCard";
import { useEffect, useState } from "react";
import { ButtonStyle, CardStyle, InputStyle, Material } from "../type";
import Input from "../components/Input/Input";
import axios from "axios";
import Magnifier from "../components/Magnifier";
import DropDownMenu from "../components/DropDownMenu";
import Button from "../components/Button";
import CustomDrawer from "../components/CustomDrawer";
import CollapseBlock from "../components/CollapseBlock";
import CustomCheckBox from "../components/CustomCheckBox";

const filters = [
  { name: "filter 1" },
  { name: "filter 2" },
  { name: "filter 3" },
];

const GroupOfFilters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const groupsFilters = [
  {
    key: "1",
    label: "Group 1",
    children: (
      <GroupOfFilters>
        <Button text="Subgroup 1" styleType={ButtonStyle.GRAY} />
        <Button text="Subgroup 2" styleType={ButtonStyle.GRAY} />
        <Button text="Subgroup 3" styleType={ButtonStyle.GRAY} />
      </GroupOfFilters>
    ),
  },
  {
    key: "2",
    label: "Group 2",
    children: (
      <GroupOfFilters>
        <Button text="Subgroup 4" styleType={ButtonStyle.GRAY} />
        <Button text="Subgroup 5" styleType={ButtonStyle.GRAY} />
        <Button text="Subgroup 6" styleType={ButtonStyle.GRAY} />
        <Button text="Subgroup 7" styleType={ButtonStyle.GRAY} />
        <Button text="Subgroup 8" styleType={ButtonStyle.GRAY} />
      </GroupOfFilters>
    ),
  },
  {
    key: "3",
    label: "Group 3",
    children: (
      <GroupOfFilters>
        <Button text="Subgroup 9" styleType={ButtonStyle.GRAY} />
      </GroupOfFilters>
    ),
  },
  {
    key: "4",
    label: "Group 4",
    children: (
      <GroupOfFilters>
        <Button text="Subgroup 9" styleType={ButtonStyle.GRAY} />
      </GroupOfFilters>
    ),
  },
  {
    key: "5",
    label: "Group 5",
    children: (
      <GroupOfFilters>
        <Button text="Subgroup 9" styleType={ButtonStyle.GRAY} />
      </GroupOfFilters>
    ),
  },
  {
    key: "6",
    label: "Group 6",
    children: (
      <GroupOfFilters>
        <Button text="Subgroup 9" styleType={ButtonStyle.GRAY} />
      </GroupOfFilters>
    ),
  },
  {
    key: "7",
    label: "Group 7",
    children: (
      <GroupOfFilters>
        <Button text="Subgroup 9" styleType={ButtonStyle.GRAY} />
      </GroupOfFilters>
    ),
  },
  {
    key: "8",
    label: "Group 8",
    children: (
      <GroupOfFilters>
        <Button text="Subgroup 9" styleType={ButtonStyle.GRAY} />
      </GroupOfFilters>
    ),
  },
];

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

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // useEffect(() => {});
  // Решит ли проблему заедания кнопки развертывания карточки сырья?

  return (
    <>
      <CustomDrawer
        open={open}
        onClose={onClose}
        size="large"
        placement="left"
        title="All filters"
      >
        <DrawerContainer>
          <FilterGroups>
            <CollapseBlock items={groupsFilters} />
          </FilterGroups>
          <FilterNames>
            {filters.map((filter) => (
              <FilterBlock>
                <CustomCheckBox />
                <p>{filter.name}</p>
              </FilterBlock>
            ))}
          </FilterNames>
        </DrawerContainer>
      </CustomDrawer>
      <Header>
        <SearchContainer>
          <Categories />
          <VerticalDivider />
          <InputWrapper>
            <Input
              styleType={InputStyle.DEFAULT}
              placeholder=""
              onChange={() => {}}
              value={""}
            />
          </InputWrapper>

          <InputIcon>
            <Magnifier />
          </InputIcon>
        </SearchContainer>
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

          <div>
            <Button
              styleType={ButtonStyle.BLUE}
              text="All filters"
              onClick={showDrawer}
            />
          </div>
        </FiltersContainer>
        <MaterialsList>
          {materials?.map((material: Material) => (
            <MaterialCard
              link={"/material"}
              text={isOpen ? "Less" : "More"}
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

const DrawerContainer = styled.div`
  display: flex;
  flex-direction: row;

  height: 100%;
  width: 100%;
`;

const FilterGroups = styled.div`
  width: 100%;
  height: 100%;

  padding: 0 10px 0 0;
`;

const FilterNames = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px;

  padding-left: 10px;
`;

const FilterBlock = styled.div`
  width: 100%;
  height: 50px;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;

  background-color: #fafafa;
  outline: 1px solid #d9d9d9;
  border-radius: 5px;

  padding: 0 10px 0 10px;
  box-sizing: border-box;
`;
