using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Models.CoreModels;
using Models.DataModels;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Xmeme.Controllers
{
    [Route("")]
    [ApiController]
    public class MemeController : Controller
    {
        public readonly IMemeService MemeService;
        public MemeController(IMemeService service)
        {
            MemeService = service;
        }

        [HttpPost]
        [Route("memes")]
        public IActionResult AddMeme([FromBody]MemeForm form)
        {
            
            if(this.MemeService.CheckMemeExists(form))
            {
                return StatusCode(409);
            }
            var id = this.MemeService.PostMeme(form);
            return Ok( new { id });
        }

        [HttpGet]
        [Route("memes")]
        public List<MemeProfile> GetMemes()
        {
            return this.MemeService.GetMemes();
        }

        [HttpGet]
        [Route("memes/{id}")]
        public ActionResult<MemeProfile> GetMemeById([FromRoute]int id)
        {
            var selectedMeme =  this.MemeService.GetMemeById(id);
            if(selectedMeme == null)
            {
                return NotFound();
            }
            return selectedMeme;
        }

        [HttpPatch]
        [Route("memes/{id}")]
        public ActionResult<MemeProfile> UpdateMemeById([FromRoute] int id,[FromBody] MemeForm meme)
        {
            //JsonPatchDocument<Meme> memePatch
            var selectedMeme = this.MemeService.GetDataMemeById(id);
            if (selectedMeme == null)
            {
                return NotFound();
            }
            //memePatch.ApplyTo(selectedMeme);
            selectedMeme.Caption = meme.Caption != null ? meme.Caption : selectedMeme.Caption;
            selectedMeme.Url = meme.Url != null ? meme.Url : selectedMeme.Url;
            this.MemeService.UpdatMeme(selectedMeme);
            return Ok();
        }

    }
}
