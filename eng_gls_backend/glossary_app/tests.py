from collections import OrderedDict
import logging

from users.tests import BaseSetUp


class GlsTestCase(BaseSetUp):
    def create_gls(self):
        data = {
            'title': 'test_glossary'
            }
        r = self.sign_in().post('/api/create-glossary/', data=data)
        self.assertEqual(r.status_code, 200)
    
    def get_gls(self):
        r = self.sign_in().get('/api/get-glossary/')
        self.assertEqual(r.data, 
                    [OrderedDict([('id', 1), 
                      ('title', 'test_glossary'), 
                      ('owner', 1)])]
                    )

    def test_main(self):
        self.create_gls()
        self.get_gls()