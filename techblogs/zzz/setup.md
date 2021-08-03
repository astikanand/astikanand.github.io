# Setup

> ###### Setup Virtual Environment for Development

```bash
pip3 install virtualenv
virtualenv .venv
source .venv/bin/activate
```





> ###### Install Django

```
pip install django
```





> ###### Install MongoDB Community Edition

```
brew tap mongodb/brew
brew install mongodb-community@4.4

# Run
brew services start mongodb-community@4.4

# Access mongo from terminal 
mongo
```

**[Install MongoDB Compass to access the GUI for mongodb](https://www.mongodb.com/try/download/compass)**





> ###### Install & Setup Djongo Engine

```
pip install djongo
```

**settings.py**

```python
DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': 'your-db-name',
        'CLIENT': {
           'host': 'your-db-host',
        }
    }
}
```









| **Toxic**                                   | **Chemical Sources**                                         | **Environmental Effects**                                    |
| ------------------------------------------- | :----------------------------------------------------------- | ------------------------------------------------------------ |
| **Nitrogen Oxides (NO and NO<sub>2</sub>)** | • combustion of oil, coal, gas<br />• bacterial action in soil<br />• forest fires, volcanic action, lightning | • decreased visibility due to yellowish color of NO<sub>2</sub><br />• NO<sub>2</sub> can suppress plant growth |
| **Volatile Organic Compounds (VOCs)**       | • evaporation of fuels <br />• incomplete combustion of fossil fuels | • eye irritation <br />• respiratory irritation <br />• some are carcinogenic <br />• decreased visibility due to blue-brown haze |
| **Ozone (O<sub>3</sub>)**                   | • formed from photolysis of NO<sub>2</sub><br />• sometimes results from stratospheric ozone intrusions | • decreased crop yields <br />• retards plant growth <br />• **damages plastics** <br />• breaks down rubber |
| **Peroxyacetyl Nitrates (PAN)**             | • formed by the reaction of NO<sub>2</sub> with VOCs         | • eye irritation <br />• high toxicity to plants <br />• **damaging to proteins** |
|                                             |                                                              |                                                              |

