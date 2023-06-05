import { Stack } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export default class AwsLambdaStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const getProductsList = new lambda.Function(this, "getProductsList", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("resources"),
      handler: "products.getProductsList",
    });

    const getProductsById = new lambda.Function(this, "getProductsById", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("resources"),
      handler: "products.getProductsById",
    });

    const api = new apigateway.RestApi(this, "products-api", {
      restApiName: "Products Service",
      description: "This service serves products",
    });

    const products = api.root.addResource("products");

    products.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getProductsList)
    );
    products
      .addResource("{productId}")
      .addMethod("GET", new apigateway.LambdaIntegration(getProductsById));
  }
}
