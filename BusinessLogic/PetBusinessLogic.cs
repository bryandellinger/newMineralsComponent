using Minerals.Interfaces;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Minerals.BusinessLogic
{
    public class PetBusinessLogic : IPetBusinessLogic
    {
        private IGenericRepository<Pet> genericRepository;
        private IPetRepository repository;

        public PetBusinessLogic(IGenericRepository<Pet> genericRepo, IPetRepository repo)
        {
            genericRepository = genericRepo;
            repository = repo;
        }
        public object Save(Pet model)
        {
            if (model.Id > 0)
            {
                repository.Update(model);
                return new Pet { Id = model.Id };
            }
            else
            {
                Pet newPet= new Pet
                {
                    Id = 0,
                    PetName = model.PetName,
                    PetTypeId = model.PetTypeId,
                    PetBirthdate= model.PetBirthdate,
                    PetPrice = model.PetPrice,
                };
                genericRepository.Insert(newPet);
                return new RTNumber { Id = newPet.Id };
            }
        }
    }
}
