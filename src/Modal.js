import React from 'react'
import { Button, Image, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function ModalImage(props) {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show modal window</Button>}
    >
      <Modal.Header>Title: {props.title}</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={props.image} wrapped />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Close Modal</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalImage