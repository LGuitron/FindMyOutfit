import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import {Suggestion} from '../models';
import {SuggestionRepository} from '../repositories';

export class SuggestionController {
  constructor(
    @repository(SuggestionRepository)
    public suggestionRepository : SuggestionRepository,
  ) {}

  @post('/suggestions', {
    responses: {
      '200': {
        description: 'Suggestion model instance',
        content: {'application/json': {'x-ts-type': Suggestion}},
      },
    },
  })
  async create(@requestBody() suggestion: Suggestion): Promise<Suggestion> {
    return await this.suggestionRepository.create(suggestion);
  }

  @get('/suggestions/count', {
    responses: {
      '200': {
        description: 'Suggestion model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Suggestion)) where?: Where,
  ): Promise<Count> {
    return await this.suggestionRepository.count(where);
  }

  @get('/suggestions', {
    responses: {
      '200': {
        description: 'Array of Suggestion model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Suggestion}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Suggestion)) filter?: Filter,
  ): Promise<Suggestion[]> {
    return await this.suggestionRepository.find(filter);
  }

  @patch('/suggestions', {
    responses: {
      '200': {
        description: 'Suggestion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() suggestion: Suggestion,
    @param.query.object('where', getWhereSchemaFor(Suggestion)) where?: Where,
  ): Promise<Count> {
    return await this.suggestionRepository.updateAll(suggestion, where);
  }

  @get('/suggestions/{id}', {
    responses: {
      '200': {
        description: 'Suggestion model instance',
        content: {'application/json': {'x-ts-type': Suggestion}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Suggestion> {
    return await this.suggestionRepository.findById(id);
  }

  @patch('/suggestions/{id}', {
    responses: {
      '204': {
        description: 'Suggestion PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() suggestion: Suggestion,
  ): Promise<void> {
    await this.suggestionRepository.updateById(id, suggestion);
  }

  @del('/suggestions/{id}', {
    responses: {
      '204': {
        description: 'Suggestion DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.suggestionRepository.deleteById(id);
  }
}
