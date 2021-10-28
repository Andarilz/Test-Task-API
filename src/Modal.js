import React from 'react'
import { Button, Image, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function ModalImage(props) {
  const [open, setOpen] = React.useState(false)
  const {title, image, description} = props

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show modal window</Button>}
    >
      <Modal.Header>Title: {title}</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={image} wrapped />
        <Modal.Description>
          <p><strong>ID:</strong> {description.id}</p>
          <p><strong>AlbumID:</strong> {description.albumId}</p>
          <p><strong>IMG URL:</strong> {description.url}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Close Modal</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalImage