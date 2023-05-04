import { Tabs, Card } from 'antd';

const onChange = (key: string) => {
  console.log(key);
};

const AccountDetail = () => {
  return (
    <>
      <h3>用户XXX</h3>
      <Tabs
        onChange={onChange}
        type="card"
        items={new Array(2).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: (
              <>
                <Card title="dddd">
                  <div>Account Detail {id}</div>
                </Card>
              </>
            ),
          };
        })}
      />
    </>
  );
};

export default AccountDetail;
