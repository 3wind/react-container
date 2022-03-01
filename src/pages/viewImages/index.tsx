import React from 'react';
import Viewer from 'react-viewer';

const ImageView = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setVisible(true);
        }}
      >
        show
      </button>
      <Viewer
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        drag={false}
        attribute={false}
        downloadable={false}
        changeable={false}
        showTotal={false}
        images={[
          {
            src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            alt: '',
          },
          {
            src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            alt: '',
          },
        ]}
      />
    </div>
  );
};
export default ImageView;
