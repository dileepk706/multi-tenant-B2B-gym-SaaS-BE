import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

import IGymController from '@/module/gym/domain/interfaces/gym.controller.interface.js';
import { IGymService } from '@/module/gym/domain/interfaces/gym.service.interface.js';
import { responseHandler } from '@/shared/response_handler.js';

@injectable()
class GymController implements IGymController {
  constructor(@inject('IGymService') private readonly gymService: IGymService) {}

  async getGymById(req: Request, res: Response): Promise<void> {
    const gym = await this.gymService.getGymById(req.params.id as string);

    if (!gym) {
      res.status(404).json({
        success: false,
        message: 'Gym not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: gym,
    });
  }

  getAllGyms = async (req: Request, res: Response) => {
    return responseHandler(res, { result: req.user }, 'Gyms fetched successfully', 200);
  };
}

export default GymController;
