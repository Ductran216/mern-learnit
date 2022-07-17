import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext, useState } from 'react';
import { PostContext } from '../../contexts/PostContext';

function AddPostModal() {
    // Contexts
    const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } = useContext(PostContext);

    // State
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN',
    });

    const { title, description, url } = newPost;

    const onChangeNewPostForm = (e) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    };

    const closeDialog = () => {
        setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' });
        setShowAddPostModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { success, message } = await addPost(newPost);
        setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' });
        setShowAddPostModal(false);
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
    };

    return (
        <Modal show={showAddPostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-2">
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            required
                            aria-describedby="title-help"
                            value={title}
                            onChange={onChangeNewPostForm}
                        />
                        <Form.Text id="title-help" muted>
                            Required
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            as="textarea"
                            row={3}
                            placeholder="Description"
                            name="description"
                            value={description}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Tutorial URL"
                            name="url"
                            value={url}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Learn It!
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddPostModal;
