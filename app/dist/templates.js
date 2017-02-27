angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('productSummary/productSummary.html','<a href="#!/product/{{product.id}}" class="thumbnail">\n    <img ng-src="{{product.image}}" class="img-responsive">\n    <div class="caption">\n        <h3>{{product.name}}</h3>\n        <p class="text-justify">{{product.description}}</p>\n    </div>\n</a>\n');
$templateCache.put('home/home.html','<div class="container-fluid">\n    <h3>Featured Products</h3>\n    <div class="row">\n        <div class="col-sm-6 col-md-3" ng-repeat-start="product in vmHomeController.featuredProductList">\n            <product-summary product="product"></product-summary>\n        </div>\n        <div class="clearfix visible-sm-block" ng-if="$odd"></div>\n        <div class="clearfix visible-md-block" ng-repeat-end ng-if="($index + 1) % 4 === 0"></div>\n    </div>\n</div>\n');
$templateCache.put('category/category.html','<div class="container-fluid">\n    <h3>{{vmCategoryController.category.name}}</h3>\n    <div class="row">\n        <div class="col-sm-6 col-md-3" ng-repeat-start="product in vmCategoryController.productList">\n            <product-summary product="product"></product-summary>\n        </div>\n        <div class="clearfix visible-sm-block" ng-if="$odd"></div>\n        <div class="clearfix visible-md-block" ng-repeat-end ng-if="($index + 1) % 4 === 0"></div>\n    </div>\n</div>\n');
$templateCache.put('cart/cart.html','<div class="container-fluid">\n    <h3>Cart</h3>\n    <p ng-if="vmCartController.cart.getItemList().length === 0">No items in your cart.</p>\n    <div class="row" ng-if="vmCartController.cart.getItemList().length > 0">\n        <div class="col-md-9">\n            <div class="table-responsive">\n                <table class="table table-hover table-striped">\n                    <thead>\n                        <tr>\n                            <th colspan="2">Product</th>\n                            <th class="text-right">Price</th>\n                            <th class="text-right">Quantity</th>\n                            <th class="text-right">Total</th>\n                            <th></th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr ng-repeat="item in vmCartController.cart.getItemList()">\n                            <td style="width: 100px; max-width: 100px;"><img ng-src="{{item.product.image}}" class="img-responsive"/></td>\n                            <td>{{item.product.name}}</td>\n                            <td class="text-right">${{item.product.price}}</td>\n                            <td class="text-right" ng-init="quantity = item.quantity">\n                                <input type="number" min="1" class="form-control" ng-model="quantity" ng-change="vmCartController.cart.updateItemQuantity(item, quantity)"/>\n                            </td>\n                            <td class="text-right">{{vmCartController.getItemTotal(item) | currency:\'$\':2}}</td>\n                            <td class="text-right">\n                                <a ng-click="vmCartController.cart.removeItem(item)"><i class="fa fa-times"></i></a>\n                            </td>\n                        </tr>\n                    </tbody>\n                    <tfoot>\n                        <tr>\n                            <th colspan="4">Grand Total</th>\n                            <td class="text-right">{{vmCartController.cart.getCartTotal() | currency:\'$\':2}}</td>\n                            <td></td>\n                        </tr>\n                    </tfoot>\n                </table>\n            </div>\n            <a href="#!/" class="btn btn-default">Continue Shopping</a>\n            <button class="btn btn-primary pull-right">Checkout</button>\n        </div>\n        <div class="col-md-3">\n            <h4>Related Products</h4>\n            <product-summary product="product" ng-repeat="product in vmCartController.relatedProductList"></productSummary>\n        </div>\n    </div>\n</div>\n');
$templateCache.put('product/product.html','<div class="container-fluid">\n    <h3>{{vmProductController.product.name}}</h3>\n    <div class="row">\n        <div class="col-md-6">\n            <img ng-src="{{vmProductController.product.image}}" class="img-responsive" />\n        </div>\n        <div class="col-md-6">\n            <p class="text-justify">{{vmProductController.product.description}}</p>\n\n            <strong>{{vmProductController.product.price | currency:\'$\':2}}</strong>\n\n            <form class="form-inline" ng-submit="vmProductController.addToCart()">\n                <div class="form-group">\n                    <input type="number" class="form-control" placeholder="Quantity" ng-model="vmProductController.quantity" min="1"/>\n                </div>\n                <button type="submit" class="btn btn-primary">Add to Cart</button>\n            </form>\n        </div>\n    </div>\n    <div>\n        <h4>Reviews</h4>\n        <blockquote ng-repeat="review in vmProductController.product.reviewList">\n            <p class="fs-14 text-justify">{{review.comments}}</p>\n            <footer>{{review.user.name}}</footer>\n        </blockquote>\n    </div>\n</div>\n');}]);