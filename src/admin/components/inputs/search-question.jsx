import React, { Component } from 'react';
import {
    Card,
    Input,
    Button,
    Icon,
    AutoComplete,
    Option
} from 'antd';

class SearchQuestion extends Component {
    render() {
        return (
            <Card title='Выбрать из существующих вопросов'>
                <AutoComplete
                    className='global-search'
                    size='large'
                    style={ { width: '100%', height: '40px' } }
                    dataSource={ [1, 2, 3, 4, 5].map((item) => <Option key={ item }>{ item }</Option>) }
                    placeholder='Введите заголовок вопроса'
                    optionLabelProp='text'
                    onChange={ this.handleValueChange }
                >
                    <Input
                        suffix={ (
                            <Button className='search-btn' size='large' type='primary'>
                                <Icon type='search' />
                            </Button>
                        ) }
                    />
                </AutoComplete>
            </Card>
        );
    }

    handleValueChange = (value) => {
        this.searchQuestionModel.setValue(value);
        this.searchQuestionModel.getQuestions();
    }
}

export { SearchQuestion };
