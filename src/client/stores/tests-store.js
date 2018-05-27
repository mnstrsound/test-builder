import { action, observable } from 'mobx';
import axios from 'axios';

import { getAuthHeader } from '../../utils/get-auth-header';

class TestsStore {
    @observable tests = [];
    @observable currentTest = {};

    @action async getTests() {
        return axios
            .get('/api/user/tests', { headers: await getAuthHeader() })
            .then(({ data: { tests, answers } }) => {
                tests.forEach((test, index) => {
                    test.userAnswers = answers[index].answers;
                });
                tests.forEach(test => {
                    let correctAnswers = 0;
                    if (test.userAnswers) {
                        test.questions.forEach((question, index) => {
                            const questionAnswers = question.answers.reduce((acc, answer) => {
                                if (answer.isCorrect) {
                                    acc.push(answer.content);
                                }
                                return acc;
                            }, []).sort().join();
                            const userAnswers = test.userAnswers[index].sort().join();
                             if (questionAnswers === userAnswers) ++correctAnswers;
                        });
                    }
                   test.percentage = (correctAnswers / test.questions.length) * 100;
                });
                this.tests = tests
                console.log(tests);
            });
    }

    @action async getTest(id) {
        return axios
            .get(`/api/test/${id}`, { headers: await getAuthHeader() })
            .then(({ data }) => { this.currentTest = data[0] });
    }
}

export { TestsStore as ClientTestsStore };
