import { DockerComposeEnvironment, StartedDockerComposeEnvironment, Wait } from 'testcontainers';
import TestContainer from "./book.test";


jest.setTimeout(2 * 60 * 1000);

const path = require('path');


describe('AppController (container)', () => {
    let startedEnviroment: StartedDockerComposeEnvironment;
    beforeAll(async () => {
        console.log('iniciando Base de datos..');
        
        const enviroment = new DockerComposeEnvironment(
            path.resolve(__dirname, '../src/DockerTestcontainer'),

            'docker-compose-test.yaml',

        )
        .withBuild()
        .withWaitStrategy(

                'booksdb_test',

                Wait.forLogMessage('database system is ready to accept connections'),

        )
        console.log('estrategia de BD..');

        startedEnviroment = await enviroment.up(['db']);
        console.log('Completo BD..');

    });

    afterAll(async () => {
        await startedEnviroment.down();
    });

    describe('Test E2E - Courses', TestContainer);


});