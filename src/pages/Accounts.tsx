import Fab from '../components/Fab';
import Add from '../components/Icons/Add';
import SearchBar from '../components/SearchBar';
import ActionDropdown from '../components/Table/ActionDropdown';
import Header from '../components/Table/Header';
import Row from '../components/Table/Row';
import Table from '../components/Table/Table';

const Accounts = () => {
  const getHeaderContents = () => {
    return [
      <input type="checkbox" className="checkbox bg-secondary " />,
      'UID',
      'Username',
      'Role',
      'Date Created',
      'Password',
      'Status',
      'Actions',
    ];
  };

  const getRows = () => {
    const sampleRow = [
      {
        body: <input type="checkbox" className="checkbox bg-secondary " />,
      },
      {
        body: '5530E841',
      },
      {
        body: 'staff01',
      },
      {
        body: (
          <span className="badge text-base badge-primary pt-[2px]">Staff</span>
        ),
      },
      {
        body: '7/3/2023',
      },
      {
        body: '*******',
      },
      {
        body: (
          <span className="badge text-base badge-success pt-[2px]">Active</span>
        ),
      },
    ];

    return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((a, index) => {
      const contents = [...sampleRow];
      const position = index > 4 ? 'top' : 'bottom';
      contents.push({ body: <ActionDropdown position={position} /> });

      return <Row key={index} contents={contents} />;
    });
  };

  return (
    <div className="flex flex-col gap-[16px] pb-[28px] px-[36px] h-full  ">
      <SearchBar />
      <div className="bg-secondary rounded-[5px] h-[752px]  ">
        <Table
          header={<Header contents={getHeaderContents()} />}
          rows={getRows()}
        />
        {/* <Pagination /> */}
      </div>
      <Fab label={<Add />} tooltip="Account" />
    </div>
  );
};

export default Accounts;
