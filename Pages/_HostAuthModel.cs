using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

namespace BlazorServerMSDemo
{
    [EnableCors]
    public class _HostAuthModel : PageModel
    {

        public IActionResult OnGetLogin()
        {
            return Challenge(AuthProps(), OpenIdConnectDefaults.AuthenticationScheme);
        }

        public async Task OnGetLogout()
        {
            await HttpContext.SignOutAsync("Cookies");
            await HttpContext.SignOutAsync(OpenIdConnectDefaults.AuthenticationScheme, AuthProps());
        }

        private AuthenticationProperties AuthProps()
        {
            return new AuthenticationProperties
            {
                RedirectUri = Url.Content("~/")
            };
        }
    }
}