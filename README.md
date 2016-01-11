##React Render Placement Loader

	npm install render-placement-loader

This will add
```
require('react-dom').render(require('react-dom').createElement(Component), document.getElementById('id'))
```
to your jsx for you. (id is from config)

You can also pass an optional `props` object via the query.

**Usage:**
Recommend：use it as webpack preLoader

`component`: explicitly pass the name of the component you want rendered
`props`: props to pass the component
`id`: id as mountNode

```
    {
      test: /\.jsx$/,
      loader: 'render-placement-loader',
      query: {
      	props: { foo: 'bar' },
      	component: 'ComponentName',
        id: 'root'
      }
    }
```

Works with ES6 classes and `React.createClass` components.
