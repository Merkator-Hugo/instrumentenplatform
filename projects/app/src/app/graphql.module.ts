import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../environments/environment';

// const uri = 'http://10.0.10.13:4000/graphql'; // <-- add the URL of the GraphQL server here
// const uri = 'halley://server/graphql'; // <-- add the URL of the GraphQL server here
// const uri = 'http://localhost:4000/graphql'; // <-- add the URL of the GraphQL server here
const uri = environment.serverUri;
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
