###### Choose the best azure service to automate your business processess

#### Unit 1

Business processes modeled in software are often called workflows. Azure includes four different technologies that you can use to build and implement workflows that integrate multiple systems:

Logic Apps
Microsoft Power Automate
WebJobs
Azure Functions
These four technologies have some similarities. For example:

They can all accept inputs. An input is a piece of data or a file that is supplied to the workflow.
They can all run actions. An action is a simple operation that the workflow executes and may often modify data or cause another action to be performed.
They can all include conditions. A condition is a test, often run against an input, that may decide which action to execute next.
They can all produce outputs. An output is a piece of data or a file that is created by the workflow.

### Design First Technologies

1. Logic Apps ( have many connectors)
    -Logic Apps designer
    -Code view

2. Microsoft Power Automate (built on top of logic apps)

### Code-first technologies

- when you need more control over the performance of your workflow or need to write custom code as part of the business process.
 For such people, Azure includes WebJobs and Functions.

## WebJobs and the WebJobs SDK

- Azure App Service is a cloud-based hosting service for web applications, mobile back-ends, and RESTful APIs.
- WebJobs are a part of the Azure App Service that you can use to run a program or script automatically. There are two kinds of WebJob:

1. Continuous. Run in a continuous loop. For example, you could use a continuous WebJob to check a shared folder for a new photo.

2. Triggered. Run when you manually start them or on a schedule.

 The SDK includes a range of classes, such as JobHostConfiguration and HostBuilder, which reduce the amount of code required to interact with the Azure App Service.

The WebJobs SDK only supports C# and the NuGet package manager.

## Azure Functions

An Azure Function is a simple way for you to run small pieces of code in the cloud, without having to worry about the infrastructure required to host that code.

- HTTPTrigger. When you want the code to execute in response to a request sent through the HTTP protocol.
- TimerTrigger. When you want the code to execute according to a schedule.
- BlobTrigger. When you want the code to execute when a new blob is added to an Azure Storage account.
- CosmosDBTrigger. When you want the code to execute in response to new or updated documents in a NoSQL database.

What is Azure Functions?
Azure Functions is a serverless application platform. It enables developers to host business logic that can be executed without provisioning infrastructure. Functions provides intrinsic scalability and you are charged only for the resources used. You can write your function code in the language of your choice, including C#, F#, JavaScript, Python, and PowerShell Core. Support for package managers like NuGet and NPM is also included, so you can use popular libraries in your business logic

What is a function app?
Functions are hosted in an execution context called a function app. 

#### Bindings

A binding is a declarative way to connect data and services to your function. Bindings interact with various data sources, which means you don't have to write the code in your function to connect to data sources and manage connections--the platform takes care of that complexity for you as part of the binding code. Each binding has a direction--your code reads data from input bindings, and writes data to output bindings. Each function can have zero or more bindings to manage the input and output data processed by the function.

A trigger is a type of input binding that has the ability to initiate execution of some code.

Azure provides a large number of bindings to connect to different storage and messaging services.

Bindings
A binding is a declarative way to connect data and services to your function. Bindings interact with various data sources, which means you don't have to write the code in your function to connect to data sources and manage connections--the platform takes care of that complexity for you as part of the binding code. Each binding has a direction--your code reads data from input bindings, and writes data to output bindings. Each function can have zero or more bindings to manage the input and output data processed by the function.

A trigger is a type of input binding that has the ability to initiate execution of some code.

Azure provides a large number of bindings to connect to different storage and messaging services.

Define a sample binding
Let's look at an example of configuring a function with an input binding (trigger) and an output binding. Let's say we want to write a new row to Azure Table storage whenever a new message appears in Azure Queue Storage. This scenario can be implemented using an Azure Queue Storage trigger and an Azure Table storage output binding.

The following snippet is the function.json file for this scenario.

JSON

Copy
{
  "bindings": [
    {
      "name": "order",
      "type": "queueTrigger",
      "direction": "in",
      "queueName": "myqueue-items",
      "connection": "MY_STORAGE_ACCT_APP_SETTING"
    },
    {
      "name": "$return",
      "type": "table",
      "direction": "out",
      "tableName": "outTable",
      "connection": "MY_TABLE_STORAGE_ACCT_APP_SETTING"
    }
  ]
}
Our JSON configuration specifies that our function will be triggered when a message is added to a queue named myqueue-items. The return value of our function is then written to outTable in Azure Table storage. For PowerShell functions, output bindings are explicitly written to with the Push-OutputBinding cmdlet.

This example is a simple illustration of how we configure bindings for a function. We could change the output to be an email using a SendGrid binding, or put an event onto a Service Bus to notify some other component in our architecture, or even have multiple output bindings to push data to various services.

What is a trigger?
A trigger is an object that defines how an Azure Function is invoked. For example, if you want a function to execute every 10 minutes, you could use a timer trigger.

Every function must have exactly one trigger associated with it. If you want to execute a piece of logic that runs under multiple conditions, you need to create multiple functions that share the same core function code.

In this module, we're going to focus on three trigger types: timer, HTTP, and blob.

#### Timer Trigger

What is a timer trigger?
A timer trigger is a trigger that executes a function at a consistent interval. To create a timer trigger, you need to supply two pieces of information.

A Timestamp parameter name, which is simply an identifier to access the trigger in code.
A Schedule, which is a CRON expression that sets the interval for the timer.

#### CRON 

What is a CRON expression?
A CRON expression is a string that consists of six fields that represent a set of times.

The order of the six fields in Azure is: {second} {minute} {hour} {day} {month} {day of the week}.

For example, a CRON expression to create a trigger that executes every five minutes looks like: 0 */5 * * * *

At first, this string may look confusing. We'll come back and break down these concepts when we have a deeper look at CRON expressions.


Special character	Meaning	Example

*	Selects every value in a field	               An asterisk "*" in the day of the week field means every day.

,	Separates items in a list	                   A comma "1,3" in the day of the week field means just Mondays (day 1) and                                                Wednesdays(day 3).

-	Specifies a range	                           A hyphen "10-12" in the hour field means a range that includes the hours 10, 11,    and 12.

/	Specifies an increment	                        A slash "*/10" in the minutes field means an increment of every 10 minutes.

To build a CRON expression, you need to have a basic understanding of some of the special characters.

#### HTTp Trigger

What is an HTTP trigger Authorization level?
An HTTP trigger Authorization level is a flag that indicates whether an incoming HTTP request needs an API key for authentication.

There are three Authorization levels:

Function
Anonymous
Admin
The Function and Admin levels are "key" based. To send an HTTP request, you must supply a key for authentication. There are two types of keys: function and host. The difference between the two keys is their scope. Function keys are specific to a function. Host keys apply to all functions inside the function app. If your Authorization level is set to Function, you can use either a function or a host key. If your Authorization level is set to Admin, you must supply a host key.

### Azure Storgae

What is Azure Storage?
Azure Storage is Microsoft's cloud storage solution that supports all types of data, including: blobs, queues, and NoSQL. The goal of Azure Storage is to provide data storage that's:

Highly available
Secure
Scalable
Managed

### Azure Blob Storage

What is Azure Blob storage?
Azure Blob storage is an object storage solution that's designed to store large amounts of unstructured data.

For example, Azure Blob storage is great at doing things like:

Storing files
Serving files
Streaming video and audio
Logging data

There are three types of blobs: block blobs, append blobs, and page blobs. Block blobs are the most common type. They allow you to store text or binary data efficiently. Append blobs are like block blobs, but they're designed more for append operations like creating a log file that's being constantly updated. Finally, page blobs are made up of pages and are designed for frequent random read and write operations

##### Blob Trigger

### default path
1. samples-workitems/{name}
    -sample-workitems: container
    - name: filename

2. samples-workitems/{name}.png

A blob trigger invokes an Azure function when it sees activity at a specific location in your Azure Storage blob account. You set the location to monitor by modifying the Path value in the Azure portal.

Types of supported bindings
The type of binding defines where we are reading or sending data. There is a binding to respond to web requests, and a large selection of bindings to interact directly with various Azure services, as well as third-party services.

### Types of bindings

A binding type can be used as an input, an output, or both. For example, a function can write to a Blob Storage output binding, but a Blob Storage update could trigger another function.

Some common binding types follow:

Blob Storage
Azure Service Bus Queues
Azure Cosmos DB
Azure Event Hubs
External files
External tables
HTTP endpoints
    
Binding properties
Three properties are required in all bindings. You may have to supply additional properties based on the type of binding and storage you are using.

## Name - Defines the function parameter through which you access the data (for example, in a queue input binding, this is the name of the function parameter that receives the queue message content).

## Type - Identifies the type of binding (for example, the type of data or service we want to interact with).

## Direction - Indicates the direction data is flowing (for example, is it an input or output binding)?

## Additionally, most binding types also need a fourth property:

Connection - Provides the name of an app setting key that contains the connection string. Bindings use connection strings stored in app settings to keep secrets out of the function code. This makes your code more configurable and secure.    

### Input and output bindings

Read data with input bindings
Completed
100 XP
5 minutes
To connect to a data source, you need to configure an input binding. An input binding makes it possible to write minimal code to create a message. You don't need to write code for tasks, such as opening a storage connection; the Azure Functions runtime and binding take care of those tasks for you.

###### Input binding types

Azure chain functions can have multiple types of input. However, not all types support both input and output. You'll use an input function whenever you want to ingest data of that type. Here, we'll look at the input function types that support input bindings and when to use them.

Azure Blob Storage - Blob Storage bindings allow you to read from a blob.

Azure Cosmos DB - Azure Cosmos DB input bindings use the SQL API to retrieve one or more Azure Cosmos DB documents, and pass them to the input parameter of the function. The document ID, or query parameters, can be determined based on the trigger that invokes the function.

Mobile Apps - A Mobile Apps input binding loads a record from a mobile table endpoint and passes it into your function.

Azure Table storage - You can read data and work with Azure Table storage.

A full listing of supported bindings is available here

To create a binding as an input, you must define direction as in. Other parameters for each type of binding varies.

##### code

module.exports = function (context, req) {

    var bookmark = context.bindings.bookmark

    if(bookmark){
        context.res = {
        body: { "url": bookmark.url },
        headers: {
            'Content-Type': 'application/json'
        }
        };
    }
 else {

        context.res = {
            status: 404,
            body : "No bookmarks found",
            headers: {
    		'Content-Type': 'application/json'
            }
        };
    }

    context.done();
};