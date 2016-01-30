from setuptools import setup, find_packages


setup(
    name='deadclownfunny',
    version='0.1',
    author='Michael Milkin',
    author_email='mmilkin@mmilkin.com',
    description='Dedclown Server',
    packages=find_packages(exclude=['tests']),
    install_requires=[
        'flask'
        'imgurpython',
    ],
)

