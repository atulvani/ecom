'use strict';

(function () {
    angular
        .module('app')
        .factory('httpService', httpService);

    httpService.$inject = ['jsfRegisterMock', '$http'];
    function httpService (jsfRegisterMock, $http) {
        var id = {type: 'integer', minimum: 0, maximum: 100},
            personName = {type: 'string', faker: 'name.findName'},
            name = {type: 'string', faker: 'lorem.words'},
            productName = {type: 'string', faker: 'lorem.words'},
            paragraph = {type: 'string', faker: 'lorem.paragraph'},
            user = {
                type: 'object',
                properties: {id: id, name: personName},
                required: ['id', 'name']
            },
            categorySchema = {
                type: 'object',
                properties: {id: id, name: name},
                required: ['id', 'name']
            };
        jsfRegisterMock({
            url: '/user',
            method: 'GET',
            responseSchema: user
        });
        jsfRegisterMock({url: '/category', method: 'GET', responseSchema: categorySchema});
        jsfRegisterMock({
            url: '/categoryList',
            method: 'GET',
            responseSchema: {
                type: 'array',
                minItems: 3,
                maxItems: 3,
                items: categorySchema
            }
        });
        jsfRegisterMock({
            url: '/productList',
            method: 'GET',
            responseSchema: {
                type: 'array',
                minItems: 6,
                maxItems: 8,
                items: {
                    type: 'object',
                    properties: {
                        id: id, name: productName,
                        image: {type: 'string', faker: 'image.fashion'},
                        description: paragraph
                    },
                    required: ['id', 'name', 'image', 'description']
                }
            }
        });
        jsfRegisterMock({
            url: '/product',
            method: 'GET',
            responseSchema: {
                type: 'object',
                properties: {
                    id: id, name: productName,
                    price: {type: 'string', faker: 'commerce.price'},
                    image: {type: 'string', faker: 'image.fashion'},
                    description: paragraph,
                    reviewList: {
                        type: 'array',
                        minItems: 6,
                        maxItems: 8,
                        items:{
                            type: 'object',
                            properties: {
                                user: user,
                                comments: paragraph
                            },
                            required: ['user', 'comments']
                        }
                    }
                },
                required: ['id', 'name', 'image', 'description', 'price', 'reviewList']
            }
        });
        return {
            get: function (url) { return $http.get(url); }
        };
    }
})();
