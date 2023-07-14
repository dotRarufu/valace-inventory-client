import { useEffect, useState } from 'react';
import pb from '../lib/pocketbase';

const FetchTest = () => {
  const [shouldGetUsers, setShouldGetUsers] = useState(false);

  // Get users
  useEffect(() => {
    if (shouldGetUsers) {
      const getUsers = async () => {
        const result = await pb.collection('test').getFullList();

        console.log('test:', result);
        setShouldGetUsers(false);
      };

      getUsers().catch(err => {
        console.log('err:', err);
      });
    }
  }, [shouldGetUsers]);

  return (
    <>
      <button
        onClick={() => setShouldGetUsers(true)}
        className="btn btn-primary"
      >
        Get users
      </button>
    </>
  );
};

export default FetchTest;
