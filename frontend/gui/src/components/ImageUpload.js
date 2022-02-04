import React from 'react';
import axios from 'axios';

import { Upload, Icon, Modal } from 'antd';


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};



class ImageUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      preview_visible: false,
      preview_image: '',
      fileList: [],
    };
    this.handleUpload.bind(this)
  }



  handleCancel = () => this.setState({ preview_visible: false });



  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      preview_image: file.url || file.preview,
      preview_visible: true,
    });
  };

  componentDidUpdate(prevProps){
    if(prevProps.uploadKey != this.props.uploadKey){
      this.setState({
        fileList: []
      })
    }
  }

  componentWillUnmount() {
    this.setState({
      fileList: []
    })
}



  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    for (let i = 0; i < this.state.fileList.length; i++) {
      if (this.state.fileList[i].status === 'done') {
        this.handleUpload();
      }
    }
  };




  handleUpload = () => {
    const fileList = this.state.fileList;
    if (this.props.uploadImage) {
      this.props.uploadImage('ok', fileList)
    }
  }

  componentDidMount() {
    if (this.props.requestType === "put") {
      axios.get(`${process.env.REACT_APP_API_URL}/api/image/`)
        .then(res => {
          const ImageList = res.data.filter(pics => pics.question === parseInt(this.props.question_id));

          const fileList = [];

          ImageList.map((data) => {
            const isStucture = {
              uid: data.id,
              status: 'done',
              url: data.image
            }
            fileList.push(isStucture)
          })
          this.props.setImageList(fileList);
          this.setState({ fileList })
        })
    }
  }


  render() {
    const { preview_visible, preview_image, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );



    return (

      <div className="clearfix">
        <Upload
          customRequest={dummyRequest}
          listType="picture-card"
          fileList={fileList}
          onPreview={file => this.handlePreview(file)}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={preview_visible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={preview_image} />
        </Modal>

      </div>
    );
  }
}



export default ImageUpload;