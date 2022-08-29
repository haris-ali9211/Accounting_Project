import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";


function ColorSchemesExample() {
    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Link to="/">
                        <Navbar.Brand href="#home">AccSolution</Navbar.Brand>
                    </Link>
                    <Nav className="me-auto">
                        <Link to='/'>
                            <Nav.Link href="#home">Input</Nav.Link>
                        </Link>

                        <Link to='/table'>
                            <Nav.Link href="#home">ledger</Nav.Link>
                        </Link>

                        <Link to='/trialBalance'>
                            <Nav.Link href="#home">Trial Balance</Nav.Link>
                        </Link>

                        
                        <Link to='/incomeStatement'>
                            <Nav.Link href="#home">Income Statement</Nav.Link>
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default ColorSchemesExample;