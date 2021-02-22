using Models.CoreModels;
using Models.DataModels;
using PetaPoco;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.Implementations
{
    public class MemeService : IMemeService
    {
        private readonly AutoMapper.IMapper _mapper;
        public Database Db { get; set; }
        public MemeService(AutoMapper.IMapper mapper, Database db)
        {
            Db = db;
            _mapper = mapper;
        }

        public string PostMeme(MemeForm form)
        {
            Meme currentMeme = _mapper.Map<Meme>(form);
            currentMeme.CreatedOn = DateTime.Now;
            var objectId =  Db.Insert("Memes", "Id", currentMeme);
            string memeId = ""+Convert.ToInt32(objectId);
            return memeId;
        }

        public List<MemeProfile> GetMemes()
        {
             List<Meme> memes = Db.Query<Meme>("Select TOP 100 * from Memes Order By CreatedOn DESC").ToList();
            List<MemeProfile> memesProfileList = _mapper.Map<List<MemeProfile>>(memes);
            return memesProfileList;
        }

        public MemeProfile GetMemeById(int id)
        {
            var meme = Db.Query<Meme>("Select * from Memes where Id = @0", id).FirstOrDefault();
            MemeProfile memeProfile = _mapper.Map<MemeProfile>(meme);
            return memeProfile;
        }

        public Meme GetDataMemeById(int id)
        {
            var meme = Db.Query<Meme>("Select * from Memes where Id = @0", id).FirstOrDefault();
            return meme;
        }

        public bool UpdatMeme(Meme meme)
        {
            int id = Db.Update("Memes", "Id", meme);
            return true;
        }

        public bool CheckMemeExists(MemeForm meme)
        {
            var res = Db.Query<Meme>("Select * from Memes where LOWER(Name) = @0",meme.Name.ToLower()).FirstOrDefault();
            if(res == null)
            {
                return false;
            }
            return true;
        }

    }
}
