import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, gql, useQuery } from '@apollo/client';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from './styles.module.css';

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
});

const USERS = gql`
    query users {
        users {
            id
            name
            email
            phone
        }
    }
`;

function Users() {
    const { loading, error, data } = useQuery(USERS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return data.users.map((user, index) => (
        <div key={user.id}>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Typography className={styles.name} >{user.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={styles.email} >Email: {user.email}</Typography>
                    <Typography className={styles.phone} >Phone: {user.phone}</Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    ));
}

function App() {
    return (
        <ApolloProvider client={client}>
            <div>
                <h1>Users</h1>
                <Users />
            </div>
        </ApolloProvider>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));
