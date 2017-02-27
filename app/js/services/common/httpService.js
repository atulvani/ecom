'use strict';

(function () {
    angular
        .module('app')
        .factory('httpService', httpService);

    httpService.$inject = ['jsfRegisterMock', '$http'];
    function httpService (jsfRegisterMock, $http) {
        var id = {type: 'integer', minimum: 0, maximum: 100},
            date = {type: 'string', faker: 'date.recent'},
            personName = {type: 'string', faker: 'name.findName'},
            name = {type: 'string', faker: 'lorem.words'},
            categoryName = {type: 'string', faker: 'commerce.department'},
            email = {type: 'string', faker: 'internet.email'},
            image = {type: 'string', faker: 'image.image'},
            avatar = {type: 'string', faker: 'image.avatar'},
            productName = {type: 'string', faker: 'lorem.words'},
            paragraph = {type: 'string', faker: 'lorem.paragraph'},
            user = {
                type: 'object',
                properties: {id: id, name: personName, email: email, avatar: avatar},
                required: ['id', 'name', 'email', 'avatar']
            },
            category = {type: 'object', properties: {id: id, name: categoryName}, required: ['id', 'name']},
            amount = {type: 'string', faker: 'commerce.price'};

        jsfRegisterMock({url: '/user', method: 'GET', responseSchema: user});
        jsfRegisterMock({url: '/category', method: 'GET', responseSchema: category});
        jsfRegisterMock({
            url: '/categoryList', method: 'GET', responseSchema: {type: 'array', minItems: 3, maxItems: 3, items: category}
        });
        jsfRegisterMock({
            url: '/productList', method: 'GET',
            responseSchema: {
                type: 'array', minItems: 6, maxItems: 8,
                items: {
                    type: 'object', properties: {id: id, name: productName, image: image, description: paragraph}, required: ['id', 'name', 'image', 'description']
                }
            }
        });
        jsfRegisterMock({
            url: '/product', method: 'GET',
            responseSchema: {
                type: 'object',
                properties: {
                    id: id, name: productName, image: image, description: paragraph, price: amount,
                    reviewList: {
                        type: 'array', minItems: 3, maxItems: 5,
                        items: {type: 'object', properties: {user: user, comments: paragraph, date: date},
                        required: ['user', 'comments', 'date']}
                    }
                },
                required: ['id', 'name', 'image', 'description', 'price', 'reviewList']
            }
        });
        jsfRegisterMock({
            url: '/account', method: 'GET',
            responseSchema: {
                type: 'object',
                properties: {
                    user: user,
                    orderList: {
                        type: 'array', minItems: 2, maxItems: 5,
                        items:{type: 'object', properties: {id: id, date: date, status: {enum: ['Pending', 'Completed', 'Returned']}},
                        required: ['id', 'date', 'status']}
                    }
                },
                required: ['user', 'orderList']
            }
        });
        return {
            get: function (url) { return $http.get(url); }
        };
    }
})();
