using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using PetaPoco;
using PetaPoco.Providers;
using Services.Implementations;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Models.AutoMapperExtensions;
using System.IO;

namespace Xmeme
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // This will register the Interface with it's implementation
            services.AddSingleton<IMemeService, MemeService>();

            // This will register an instance of petapoco, and will inject it everytime we call it in the Constructor, 
            // So because of this we don't have to create instance of petapoco everywhere and can use one instance everywhere by 
            // Dependency Injection
            services.AddSingleton<Database>(ctx => new Database<SqlServerDatabaseProvider>
            (Configuration["ConnectionStrings:DefaultConnection"].ToString()));

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Xmeme", Version = "v1"  });
                var filePath = Path.Combine(AppContext.BaseDirectory, "Xmeme.xml");
                c.IncludeXmlComments(filePath);
            });

            // This is so to avoid Cross Policy Problems
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    );
            });

            services.AddAutoMapper(typeof(Extensions));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Xmeme v1"));
            }

            app.UseCors("CorsPolicy");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
