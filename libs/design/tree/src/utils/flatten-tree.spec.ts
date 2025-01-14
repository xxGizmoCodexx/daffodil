import { DaffTreeUi } from '../interfaces/tree-ui';
import { flattenTree } from './flatten-tree';
import { hydrateTree } from './hydrate-tree';
import { traverse } from './traverse-tree';

describe('@daffodil/design/tree - flattenTree', () => {
  it('should flatten a root into an empty array', () => {
    const data = { title: '', url: '', id: '', items: [], data: {}};
    const flat =  [];

    expect(flattenTree(hydrateTree(data))).toEqual(flat);
  });

  it('should flatten a data tree into a tree with an open first layer and closed lower layers', () => {
    const data = { title: 'Root', url: '', id: '', items: [
      { title: 'Child A', url: '', id: '', items: [
        { title: 'Child Aa', url: '', id: '', items: [], data: {}},
      ], data: {}},
      { title: 'Child B', url: '', id: '', items: [
        { title: 'Child Bb', url: '', id: '', items: [], data: {}},
      ], data: {}},
    ], data: {}};

    const flat =  flattenTree(hydrateTree(data));

    expect(flat[0].title).toEqual('Child A');
    expect(flat[1].title).toEqual('Child B');
  });

  it('should flatten an open ui tree', () => {
    const root: DaffTreeUi<any> = {
      title: 'Root',
      url: '',
      id: '',
      items: [],
      parent: undefined,
      open: true,
      data: {},
    };

    const childA = {
      title: 'Child A',
      url: '',
      id: '',
      items: [],
      parent: undefined,
      open: true,
      data: {},
    };

    const childAa = {
      title: 'Child Aa',
      url: '',
      id: '',
      items: [],
      parent: undefined,
      open: true,
      data: {},
    };
    const childB = {
      title: 'Child B',
      url: '',
      id: '',
      items: [],
      parent: undefined,
      open: true,
      data: {},
    };
    const childBb = {
      title: 'Child Bb',
      url: '',
      id: '',
      items: [],
      parent: undefined,
      open: true,
      data: {},
    };

    root.items = [childA, childB];
    childA.parent = root;
    childB.parent = root;
    childA.items = [childAa];
    childAa.parent = childA;
    childB.items = [childBb];
    childBb.parent = childB;


    const flat = flattenTree(root);

    expect(flat[0].title).toEqual('Child A');
    expect(flat[1].title).toEqual('Child Aa');
    expect(flat[2].title).toEqual('Child B');
    expect(flat[3].title).toEqual('Child Bb');
  });

  it('should clip closed branches', () => {
    const root: DaffTreeUi<any> = {
      title: 'Root',
      url: '',
      id: '',
      items: [],
      parent: undefined,
      open: true,
      data: {},
    };

    const childA = {
      title: 'Child A',
      url: '',
      id: '',
      items: [],
      parent: undefined,
      open: false,
      data: {},
    };

    const childAa = {
      title: 'Child Aa',
      url: '',
      id: '',
      items: [],
      parent: undefined,
      open: true,
      data: {},
    };
    const childB = {
      title: 'Child B',
      url: '',
      id: '',
      items: [],
      parent: undefined,
      open: true,
      data: {},
    };
    const childBb = {
      title: 'Child Bb',
      url: '',
      id: '',
      items: [],
      parent: undefined,
      open: true,
      data: {},
    };

    root.items = [childA, childB];
    childA.parent = root;
    childB.parent = root;
    childA.items = [childAa];
    childAa.parent = childA;
    childB.items = [childBb];
    childBb.parent = childB;


    const flat = flattenTree(root);

    expect(flat[0].title).toEqual('Child A');
    expect(flat[1].title).toEqual('Child B');
    expect(flat[2].title).toEqual('Child Bb');
  });

  it('should handle deep trees correctly', () => {
    const root: DaffTreeUi<any> = {
      title: 'Root',
      url: '',
      id: '',
      items: [],
      parent: undefined,
      open: true,
      data: {},
    };

    const childA = {
      title: 'Child A',
      url: '',
      id: '',
      items: [],
      parent: undefined,
      open: true,
      data: {},
    };

    const childAa = {
      title: 'Child Aa',
      url: '',
      id: '',
      items: [],
      parent: undefined,
      open: true,
      data: {},
    };
    const childAaA = {
      title: 'Child AaA',
      url: '',
      id: '',
      items: [],
      parent: undefined,
      open: true,
      data: {},
    };
    const childAaAa = {
      title: 'Child AaAa',
      url: '',
      id: '',
      items: [],
      parent: undefined,
      open: true,
      data: {},
    };

    root.items = [childA];
    childA.parent = root;
    childA.items = [childAa];
    childAa.parent = childA;
    childAa.items = [childAaA];
    childAaA.parent = childAa;
    childAaA.items = [childAaAa];
    childAaAa.parent = childAaA;


    const flat = flattenTree(root);

    expect(flat[0].title).toEqual('Child A');
    expect(flat[1].title).toEqual('Child Aa');
    expect(flat[2].title).toEqual('Child AaA');
    expect(flat[3].title).toEqual('Child AaAa');
  });
});
