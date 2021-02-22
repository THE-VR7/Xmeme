using AutoMapper;
using Models.CoreModels;
using Models.DataModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.AutoMapperExtensions
{
    public class Extensions :  Profile
    {
        public Extensions()
        {
            // This will map all the fields from source MemeForm to the fields in Meme 
            CreateMap<MemeForm, Meme>();

            // This will map all the fields from source Meme to the fields in MemeProfile
            CreateMap<Meme, MemeProfile>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => "" + src.Id));

        }
    }
}
