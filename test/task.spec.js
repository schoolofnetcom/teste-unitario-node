import sinon from 'sinon';
import chai from 'chai';
import mongoose from 'mongoose';
import Todo from './../models/task';

const expect = chai.expect;
require('sinon-mongoose');

describe('Tasks', () => {
    it ('should create a new task', (done) => {
        let mock = sinon.mock(
            new Todo({
                name: 'Task test'
            })
        );

        let todo = mock.object; //objeto necessario para criação

        mock.expects('save').yields(null, {
            status: true,
            data:  {
                name: 'Task test',
                completed: false
            }
        });

        todo.save((err, result) => {
            mock.verify();
            mock.restore();

            expect(result.status).to.equal(true);
            expect(result.data).to.be.an('object');
            done();
        });
    });

    it('should remove one task by id', (done) => {
        let mock = sinon.mock(Todo);

        mock.expects('findOneAndRemove').withArgs({
            _id: '5817dcfb0f0f3f35e8d0a018'
        }).yields(null, {
            status: true,
            _id: '5817dcfb0f0f3f35e8d0a018'
        });

        Todo.findOneAndRemove({
            _id: '5817dcfb0f0f3f35e8d0a018'
        }, (err, result) => {
            mock.verify();
            mock.restore();

            expect(result.status).to.equal(true);

            done();
        });
    });

    it('should return all tasks', (done) => {
        let mock = sinon.mock(Todo);

        mock.expects('find').yields(null, {
            status: true,
            data: []
        });

        Todo.find((err, result) => {
            mock.verify();
            mock.restore();

            expect(result.status).to.be.true;
            expect(result.data).to.be.an('array');
            done();
        });
    });

    it('should return error find', (done) => {
        let mock = sinon.mock(Todo);

        mock.expects('find').yields({
            status: false
        }, null);

        Todo.find((err, result) => {
            mock.verify();
            mock.restore();

            expect(err.status).to.be.false;
            expect(err.status).to.not.be.true;

            done();
        });
    });
});