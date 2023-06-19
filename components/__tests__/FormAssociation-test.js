import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AssociationForm from '../association/AssociationForm';
import axios from 'axios';
import { API_URL } from '@env';

jest.mock('axios');

axios.get.mockResolvedValue({
    "type": "FeatureCollection",
    "version": "draft",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    3.914331,
                    43.609078
                ]
            },
            "properties": {
                "label": "1095 Avenue Henri Becquerel 34000 Montpellier",
                "score": 0.762873162055336,
                "housenumber": "1095",
                "id": "34172_2771_01095",
                "name": "1095 Avenue Henri Becquerel",
                "postcode": "34000",
                "citycode": "34172",
                "x": 773836.38,
                "y": 6279319.23,
                "city": "Montpellier",
                "context": "34, Hérault, Occitanie",
                "type": "housenumber",
                "importance": 0.76117,
                "street": "Avenue Henri Becquerel"
            }
        }
    ],
    "attribution": "BAN",
    "licence": "ETALAB-2.0",
    "query": "1095 Rue Henri Becquerel 34000 Montpellier",
    "limit": 5
});

describe('AssociationForm', () => {


  test('should change value when user types in the text input', () => {
    const { getByTestId } = render(<AssociationForm />);
    const textInput = getByTestId('rna');

    fireEvent.changeText(textInput, 'W123456789');
    expect(textInput.props.value).toEqual('W123456789');
  });

});
