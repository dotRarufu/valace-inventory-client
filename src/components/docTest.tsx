import { Document, patchDocument } from 'docx';

const generate = async () => {
  const blobA = new Blob();

  const document = new Document({
    sections: [],
  });

  const reader = new FileReader();
  const file = new File(['hello', ' ', 'world'], 'hello_world.txt', {
    type: 'text/plain',
  });
  reader.onload = function (e) {
    const a = e.target;
    if (a !== null && a.result !== null && typeof a.result !== 'string') {
      const blob = new Blob([new Uint8Array(a.result)], { type: file.type });
      console.log(blob);
    }
  };

  const d = await patchDocument(blobA, {
    patches: {},
  });
};

const DocTest = () => {
  return <>test</>;
};

export default DocTest;
