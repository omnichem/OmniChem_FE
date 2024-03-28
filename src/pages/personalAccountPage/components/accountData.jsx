export const columns = [
  {
    title: 'Наименование сырья',
    dataIndex: 'product_name',
    sorter: (a, b) => {
      const nameA = a.product_name.toUpperCase();
      const nameB = b.product_name.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    },
  },
  {
    title: 'Производитель',
    dataIndex: 'manufacturer',
  },
  {
    title: 'Артикул',
    dataIndex: 'article',
  },
  {
    title: 'Наличие сырья',
    dataIndex: 'availability_status',
  },
  {
    title: 'Статус сопоставления',
    dataIndex: 'is_relationship',
    render: (_, { tags }) => (
      <>
        {tags.map(tag => {
          // if (tag === true) {
          //   color = 'green';
          // }
          return (
            <Tag color={tag == true ? 'green' : 'red'} key={tag}>
              {(tag = true ? <p>Сопоставлено</p> : <p>Не сопоставлено</p>)}
            </Tag>
          );
        })}
      </>
    ),
  },
];
