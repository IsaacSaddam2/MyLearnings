### Shortcuts
1. ctrl T (global search)
2. alt+T,  N O  (nuget package manager console)

To change default route
1. launchsettings.json, change the default launchurl
2. In Controller class remove route
3. In Controller Action Method give your custome route

### Add a swagger middleware

1. https://docs.microsoft.com/en-us/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-6.0&tabs=visual-studio

There are three main components to Swashbuckle:

## Swashbuckle.AspNetCore.Swagger:
 a Swagger object model and middleware to expose SwaggerDocument objects as JSON endpoints.

## Swashbuckle.AspNetCore.SwaggerGen:
 a Swagger generator that builds SwaggerDocument objects directly from your routes, controllers, and models. It's typically combined with the Swagger endpoint middleware to automatically expose Swagger JSON.

## Swashbuckle.AspNetCore.SwaggerUI:
 an embedded version of the Swagger UI tool. It interprets Swagger JSON to build a rich, customizable experience for describing the web API functionality. It includes built-in test harnesses for the public methods.

 ### Procedure
 1. install SwashBukcle.AspNetCore package
 2. In startup class, 
    In configure services, services.AddSwaggerGen()
    In Configure method, app.UseSwagger();
                         app.UseSwaggerUI();


### create objects from csv files
https://stackoverflow.com/questions/26790477/read-csv-to-list-of-objects

System.IO.File.ReadAllLines(@"Data/pensionerdetails.csv").Skip(1).Select(v=> PensionerDetail.FromCsv(v)).ToList();

In PensionerDetail class

 public static PensionerDetail FromCsv(string csvLine)
        {
            string[] values = csvLine.Split(',');
            PensionerDetail dailyValues = new PensionerDetail();
            dailyValues.Id = values[0].Substring(1);
            dailyValues.PensionerName = values[1];
            dailyValues.SalaryEarned = Convert.ToInt32(values[2]);
            dailyValues.PensionType = values[3];
            dailyValues.Allowances = Convert.ToInt32(values[4]);
            dailyValues.Dob = values[5];
            dailyValues.Pan = values[6];

            dailyValues.BankDetail = new BankDetail()
            {
                AccountNumber = values[7],
                BankName = values[8],
                BankType = values[9]
            };
  
            return dailyValues;
        }

 ### AutoMapper
 https://dotnettutorials.net/lesson/automapper-in-c-sharp/

 ### making api call from web api
https://docs.microsoft.com/en-us/aspnet/web-api/overview/advanced/calling-a-web-api-from-a-net-client

public async Task<IActionResult> ProcessPension([FromRoute] string id)
        {
            await RunAsync();
            HttpResponseMessage response = await client.GetAsync("api/pensiondetails");  // Blocking call! Program will wait here until a response is received or a timeout occurs.
            if (response.IsSuccessStatusCode)
            {
                return Ok(response.Content.ReadAsAsync<List<PensionerDetail>>().Result);
            }
            else
            {
                return BadRequest();
            }
        }

        static async Task RunAsync()
        {
            // Update port # in the following line.
            client.BaseAddress = new Uri("https://host.docker.internal:49155/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
        }

### Add HttpClient in dependency injection
https://stackoverflow.com/questions/59280153/dependency-injection-httpclient-or-httpclientfactory   

### HttpClient error ssl certificate bypass
HttpClientHandler clientHandler = new HttpClientHandler();
clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

### if running docker
use base address as https://host.docker.internal:49155/

### Jwt Authetication
https://jasonwatmore.com/post/2019/10/11/aspnet-core-3-jwt-authentication-tutorial-with-example-api

### EntityFranework

1. create Model classes
2. create a Database in SQLToolManagement
3. install nuget package microsoft.Entityframeworkcore 5.010 version && Microsoft.EntityFrameworkCore.Tools
4. create UserDbContext class extending DbContext
5. UserDbContext(DbContextOptions options): base(options)
6. In appsetting,
      "ConnectionStrings": {
    "connectionString": "Data Source=SADDAM-LAPTOP;Initial Catalog=PensionAuthentication;Integrated Security=True"
  }
7. In startup class,
    services.AddDbContext<UserDbContext>(option => option.UseSqlServer(Configuration.GetConnectionString("connectionString")));

### Adding secret key in Appsettings

services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

### Setting Authentication with jwtBearer in startup

var secretKey = Configuration.GetSection("AppSettings").Get<AppSettings>().Secret;

            var encryptKey = Encoding.ASCII.GetBytes(secretKey);

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(encryptKey)
                };
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
            });

app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(x =>
            {
                x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            });

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });             

### Creating token on successful authentication

1.inject dependency Appsettings

public class UserRepository : IUserRepository
    {
        private readonly UserDbContext _context;
        private readonly AppSettings _appsettings;
        public UserRepository(UserDbContext context, IOptions<AppSettings> appsettings)
        {
            _context = context;
            _appsettings = appsettings.Value;
        }
    }    

