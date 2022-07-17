import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function About() {
    return (
        <Row className="mt-5" style={{ marginRight: 0 }}>
            <Col className="text-center">
                <Button variant="primary" href="https://www.facebook.com/Syxfiv/" size="lg" target="_blank">
                    Visit my Facebook
                </Button>
                <p className="fw-bold">Powered by Ductran216</p>;
            </Col>
        </Row>
    );
}

export default About;
