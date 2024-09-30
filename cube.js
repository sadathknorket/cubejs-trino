
module.exports = {
    checkSqlAuth: (req, user_name, password) => { 
         
      return {
        password,
       securityContext: {
  
                user: user_name,
                password
        }
      };
    },
  
    queryRewrite: (query, { securityContext }) => {
      return query;
    },
          // contextToAppId is used as a caching key for various in-memory structures like data model compilation results, connection pool
  contextToAppId: ({ securityContext }) => {
      return `${securityContext.user}//${securityContext.password}`;
    },
          // contextToOrchestratorId is used as a caching key for database connections, execution queues and pre-aggregation table caches
  contextToOrchestratorId: ({ securityContext }) =>{
      return `${securityContext.user}//${securityContext.password}`
    },
  
   // preAggregationsSchema: ({ securityContext }) =>{ 
  // return `pre_aggregations_${securityContext.user}_${securityContext.password}`
   //},
  
//   scheduledRefreshContexts: async () => {
//         const users = ["admin"];
  
//        return users.map((id) => { 
//          return { securityContext: { user: "admin",password:"123" } }
//        })
//       },
  
  driverFactory: ({ securityContext,dataSource }) => {
    console.log("security at driver",securityContext)
    return {
      type: 'trino',
      host: 'host',
      user:securityContext.user,
      pass:securityContext.password,
      database: dataSource
    };
  }
            
    }