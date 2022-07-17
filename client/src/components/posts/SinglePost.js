import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classNames from 'classnames/bind';

import styles from '../../Global.css';
import ActionButtons from './ActionButtons';

const cx = classNames.bind(styles);

function SinglePost({ post: { _id, status, title, description, url } }) {
    return (
        <Card
            className="shadow"
            border={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}
        >
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p className={cx('post-title')}>{title}</p>
                            <Badge
                                pill
                                bg={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}
                            >
                                {status}
                            </Badge>
                        </Col>

                        <Col className="text-right">
                            <ActionButtons url={url} _id={_id} />
                        </Col>
                    </Row>
                </Card.Title>

                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default SinglePost;
