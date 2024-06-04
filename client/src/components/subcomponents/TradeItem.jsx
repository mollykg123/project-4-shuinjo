// import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'

// export default function TradeItem({ item, show, onHide }) {
//   console.log(item.owner)

//   if (!item) return null

//   return (
//       <Modal
//         show={show}
//         onHide={onHide}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="contained-modal-title-vcenter">
//             {item.title}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <h4>Centered Modal</h4>
//           <p>
//             Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//             dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//             consectetur ac, vestibulum at eros.
//           </p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={item.onHide}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//   )
// }