// import React from 'react';
// import { Form, Input } from 'antd';

// const CustomizedForm = Form.create({
//     onFieldsChange(props, changedFields) {
//         props.onChange(changedFields);
//     },
//     mapPropsToFields(props) {
//         return {
//             username: Form.createFormField({
//                 ...props.username,
//                 value: props.username.value
//             })
//         };
//     },
//     onValuesChange(_, values) {
//         console.log(values);
//     }
// })((props) => {
//     console.log('%cprops: ', 'font-size:15px;background-color: rgb(135, 208, 104);', props);

//     const { getFieldDecorator } = props.form;
//     return (
//         <Form layout="inline">
//             <Form.Item label="Username">
//                 {getFieldDecorator('username', {
//                     rules: [{ required: true, message: 'Username is required!' }]
//                 })(<Input />)}
//             </Form.Item>
//         </Form>
//     );
// });

// class Demo extends React.Component {
//     state = {
//         fields: {
//             username: {
//                 value: 'benjycui'
//             }
//         }
//     };

//     handleFormChange = (changedFields) => {
//         this.setState(({ fields }) => ({
//             fields: { ...fields, ...changedFields }
//         }));
//         console.log(this.props);
//     }

//     render() {
//         const { fields } = this.state;
//         return (
//             <div>
//                 <CustomizedForm {...fields} onChange={this.handleFormChange} />
//                 <pre className="language-bash">
//                     {JSON.stringify(fields, null, 2)}
//                 </pre>
//             </div>
//         );
//     }
// }

// export default Demo;
