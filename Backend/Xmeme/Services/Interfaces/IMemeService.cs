using Models.CoreModels;
using Models.DataModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Interfaces
{
    public interface IMemeService
    {
        string PostMeme(MemeForm form);
        List<MemeProfile> GetMemes();
        MemeProfile GetMemeById(int id);
        Meme GetDataMemeById(int id);
        bool UpdatMeme(Meme meme);
        bool CheckMemeExists(MemeForm meme);
    }
}
